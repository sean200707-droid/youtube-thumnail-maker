/**
 * 유튜브 썸네일 추출기
 * YouTube Thumbnail Extractor
 */

// DOM 요소 선택
const youtubeUrlInput = document.getElementById('youtube-url');
const extractBtn = document.getElementById('extract-btn');
const errorMessage = document.getElementById('error-message');
const errorText = document.getElementById('error-text');
const resultSection = document.getElementById('result-section');
const videoIdDisplay = document.getElementById('video-id-display');

// 썸네일 이미지 요소들
const thumbnails = {
    maxres: document.getElementById('thumb-maxres'),
    sd: document.getElementById('thumb-sd'),
    hq: document.getElementById('thumb-hq'),
    mq: document.getElementById('thumb-mq'),
    default: document.getElementById('thumb-default')
};

// 다운로드 버튼들
const downloadButtons = document.querySelectorAll('.download-btn');

// 현재 비디오 ID
let currentVideoId = null;

/**
 * 유튜브 URL에서 비디오 ID 추출
 * @param {string} url - 유튜브 URL
 * @returns {string|null} - 비디오 ID 또는 null
 */
function extractVideoId(url) {
    if (!url) return null;

    // 다양한 유튜브 URL 패턴 지원
    const patterns = [
        // 표준 URL: https://www.youtube.com/watch?v=VIDEO_ID
        /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
        // 단축 URL: https://youtu.be/VIDEO_ID
        /(?:https?:\/\/)?(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]{11})/,
        // 임베드 URL: https://www.youtube.com/embed/VIDEO_ID
        /(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
        // 쇼츠 URL: https://www.youtube.com/shorts/VIDEO_ID
        /(?:https?:\/\/)?(?:www\.)?youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
        // 모바일 URL: https://m.youtube.com/watch?v=VIDEO_ID
        /(?:https?:\/\/)?m\.youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})/,
        // 라이브 URL: https://www.youtube.com/live/VIDEO_ID
        /(?:https?:\/\/)?(?:www\.)?youtube\.com\/live\/([a-zA-Z0-9_-]{11})/
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match && match[1]) {
            return match[1];
        }
    }

    // URL 파라미터에서 v 값 추출 시도
    try {
        const urlObj = new URL(url);
        const vParam = urlObj.searchParams.get('v');
        if (vParam && vParam.length === 11) {
            return vParam;
        }
    } catch (e) {
        // URL 파싱 실패 시 무시
    }

    return null;
}

/**
 * 썸네일 URL 생성
 * @param {string} videoId - 비디오 ID
 * @param {string} quality - 화질 (maxresdefault, sddefault, hqdefault, mqdefault, default)
 * @returns {string} - 썸네일 URL
 */
function getThumbnailUrl(videoId, quality) {
    return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
}

/**
 * 오류 메시지 표시
 * @param {string} message - 오류 메시지
 */
function showError(message) {
    errorText.textContent = message;
    errorMessage.classList.remove('hidden');
    resultSection.classList.add('hidden');
}

/**
 * 오류 메시지 숨기기
 */
function hideError() {
    errorMessage.classList.add('hidden');
}

/**
 * 결과 섹션 표시
 * @param {string} videoId - 비디오 ID
 */
function showResults(videoId) {
    hideError();
    currentVideoId = videoId;

    // 비디오 ID 표시
    videoIdDisplay.textContent = `Video ID: ${videoId}`;

    // 각 화질별 썸네일 URL 설정
    thumbnails.maxres.src = getThumbnailUrl(videoId, 'maxresdefault');
    thumbnails.sd.src = getThumbnailUrl(videoId, 'sddefault');
    thumbnails.hq.src = getThumbnailUrl(videoId, 'hqdefault');
    thumbnails.mq.src = getThumbnailUrl(videoId, 'mqdefault');
    thumbnails.default.src = getThumbnailUrl(videoId, 'default');

    // maxresdefault가 없을 경우 대체 이미지 처리
    thumbnails.maxres.onerror = function () {
        this.src = getThumbnailUrl(videoId, 'hqdefault');
    };

    // 결과 섹션 표시
    resultSection.classList.remove('hidden');

    // 결과 섹션으로 스크롤
    setTimeout(() => {
        resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
}

/**
 * 이미지 다운로드
 * @param {string} url - 이미지 URL
 * @param {string} filename - 파일 이름
 */
async function downloadImage(url, filename) {
    try {
        // 이미지를 fetch하여 blob으로 변환
        const response = await fetch(url);
        const blob = await response.blob();

        // 다운로드 링크 생성
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;

        // 링크 클릭하여 다운로드
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Blob URL 해제
        URL.revokeObjectURL(link.href);
    } catch (error) {
        // CORS 문제 발생 시 새 탭에서 열기
        window.open(url, '_blank');
    }
}

/**
 * 추출 버튼 클릭 핸들러
 */
function handleExtract() {
    const url = youtubeUrlInput.value.trim();

    if (!url) {
        showError('유튜브 URL을 입력해주세요.');
        return;
    }

    const videoId = extractVideoId(url);

    if (!videoId) {
        showError('올바른 유튜브 URL을 입력해주세요. 지원되는 형식: youtube.com/watch?v=..., youtu.be/...');
        return;
    }

    // 로딩 상태 표시
    document.body.classList.add('loading');

    // 약간의 지연 후 결과 표시 (더 나은 UX)
    setTimeout(() => {
        showResults(videoId);
        document.body.classList.remove('loading');
    }, 500);
}

// 이벤트 리스너 등록
extractBtn.addEventListener('click', handleExtract);

// Enter 키로 추출
youtubeUrlInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleExtract();
    }
});

// 다운로드 버튼 클릭 핸들러
downloadButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (!currentVideoId) return;

        const quality = button.dataset.quality;
        const url = getThumbnailUrl(currentVideoId, quality);
        const filename = `youtube_thumbnail_${currentVideoId}_${quality}.jpg`;

        downloadImage(url, filename);
    });
});

// URL 입력 필드 포커스 시 전체 선택
youtubeUrlInput.addEventListener('focus', () => {
    youtubeUrlInput.select();
});

// 페이지 로드 시 URL 파라미터 확인
window.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const videoUrl = urlParams.get('url') || urlParams.get('v');

    if (videoUrl) {
        youtubeUrlInput.value = videoUrl;
        handleExtract();
    }
});

// 클립보드에서 붙여넣기 시 자동 추출
youtubeUrlInput.addEventListener('paste', (e) => {
    setTimeout(() => {
        const pastedUrl = youtubeUrlInput.value.trim();
        if (extractVideoId(pastedUrl)) {
            handleExtract();
        }
    }, 100);
});
