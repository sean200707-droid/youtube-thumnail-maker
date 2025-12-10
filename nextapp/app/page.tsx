"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Download,
  Pencil,
  X,
  Image as ImageIcon,
  Type,
  Sticker,
  Move,
  ExternalLink,
  Loader2
} from "lucide-react";

// 템플릿 종류
const templates = [
  { id: "aggro", emoji: "🔥", label: "어그로형", desc: "클릭을 부르는" },
  { id: "illustration", emoji: "🎨", label: "일러스트형", desc: "예쁜 그림체" },
  { id: "vlog", emoji: "📷", label: "브이로그형", desc: "일상 느낌" },
  { id: "business", emoji: "💼", label: "비즈니스형", desc: "깔끔하고 신뢰감" },
];

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // 썸네일 생성 (시뮬레이션)
  const handleGenerate = useCallback(() => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setGeneratedImage(null);

    // 2초 후 결과 표시
    setTimeout(() => {
      setGeneratedImage(`https://picsum.photos/seed/${Date.now()}/1280/720`);
      setIsGenerating(false);
    }, 2000);
  }, [prompt]);

  // 다운로드
  const handleDownload = () => {
    if (!generatedImage) return;

    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = `썸네일_${Date.now()}.jpg`;
    link.target = "_blank";
    link.click();
  };

  // 편집 모드 열기
  const handleEdit = () => {
    setShowEditor(true);
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] relative overflow-hidden">
      {/* 배경 그라데이션 효과 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/10 rounded-full blur-[100px]" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px]" />
      </div>

      {/* 상단 네비게이션 */}
      <motion.nav
        className="relative z-50 flex items-center justify-between px-4 py-4 md:px-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* 로고 */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 bg-red-600 rounded-lg flex items-center justify-center">
            <ImageIcon className="w-5 h-5 text-white" />
          </div>
          <span className="text-base font-bold hidden sm:block">썸네일 메이커</span>
        </div>

        {/* 썸네일 추출기 링크 */}
        <motion.a
          href="#"
          className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-400 hover:text-white hover:bg-white/10 transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ExternalLink className="w-4 h-4" />
          <span className="hidden sm:inline">썸네일 추출하기</span>
          <span className="sm:hidden">추출</span>
        </motion.a>
      </motion.nav>

      {/* 메인 콘텐츠 */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 pb-20">
        {/* 히어로 섹션 */}
        <motion.div
          className="w-full max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* 메인 제목 */}
          <h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight tracking-tight"
            style={{ fontFamily: "'Gmarket Sans', 'Pretendard', sans-serif" }}
          >
            제목만 쓰면<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">
              썸네일이 뚝딱
            </span>
          </h1>

          <p className="text-gray-400 text-sm sm:text-base mb-8 max-w-md mx-auto">
            영상 제목이나 키워드를 입력하세요.<br className="sm:hidden" />
            눈에 띄는 썸네일을 바로 만들어드려요.
          </p>

          {/* 입력창 */}
          <div className="w-full max-w-xl mx-auto mb-5">
            <div className="relative flex items-center gap-2 p-1.5 rounded-xl bg-white/5 border border-white/10 focus-within:border-red-500/50 transition-colors">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                placeholder="예: 먹방 브이로그, 매운 떡볶이 도전"
                className="flex-1 bg-transparent text-white placeholder:text-gray-500 text-sm sm:text-base px-3 py-3 outline-none"
              />
              <motion.button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="flex items-center gap-2 px-4 sm:px-5 py-3 rounded-lg bg-gradient-to-r from-red-600 to-orange-500 text-white font-medium text-sm whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed hover:from-red-500 hover:to-orange-400 transition-all"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {isGenerating ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                <span className="hidden sm:inline">썸네일 만들기</span>
                <span className="sm:hidden">만들기</span>
              </motion.button>
            </div>
          </div>

          {/* 스타일 선택 칩 */}
          <div className="w-full overflow-x-auto pb-2 -mx-4 px-4">
            <div className="flex items-center justify-center gap-2 min-w-max">
              {templates.map((template) => (
                <motion.button
                  key={template.id}
                  onClick={() => setSelectedTemplate(
                    selectedTemplate === template.id ? null : template.id
                  )}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-full text-xs sm:text-sm transition-all ${selectedTemplate === template.id
                      ? "bg-red-600 text-white"
                      : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10"
                    }`}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <span>{template.emoji}</span>
                  <span>{template.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* 결과 영역 */}
        <AnimatePresence mode="wait">
          {(isGenerating || generatedImage) && (
            <motion.div
              className="w-full max-w-2xl mx-auto mt-10 px-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              {isGenerating ? (
                /* 로딩 상태 */
                <div className="flex flex-col items-center justify-center py-16 bg-white/5 rounded-2xl border border-white/10">
                  <Loader2 className="w-10 h-10 text-red-500 animate-spin mb-4" />
                  <p className="text-gray-300 text-base">썸네일을 만들고 있어요</p>
                  <p className="text-gray-500 text-sm mt-1">잠시만 기다려주세요...</p>
                </div>
              ) : generatedImage ? (
                /* 생성된 이미지 */
                <div
                  className="relative rounded-xl overflow-hidden border border-white/10"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <motion.img
                    src={generatedImage}
                    alt="만들어진 썸네일"
                    className="w-full aspect-video object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  />

                  {/* 호버 시 표시되는 버튼들 */}
                  <motion.div
                    className="absolute inset-0 bg-black/50 flex items-center justify-center gap-3"
                    initial={false}
                    animate={{ opacity: isHovering ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ pointerEvents: isHovering ? 'auto' : 'none' }}
                  >
                    <motion.button
                      onClick={handleEdit}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition-colors"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Pencil className="w-4 h-4" />
                      <span>수정하기</span>
                    </motion.button>
                    <motion.button
                      onClick={handleDownload}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-500 transition-colors"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <Download className="w-4 h-4" />
                      <span>다운로드</span>
                    </motion.button>
                  </motion.div>
                </div>
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>

        {/* 편집 모달 */}
        <AnimatePresence>
          {showEditor && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="relative w-full max-w-3xl bg-[#1a1a1a] rounded-xl overflow-hidden border border-white/10"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
              >
                {/* 모달 헤더 */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                  <h3 className="text-base font-bold">썸네일 편집</h3>
                  <button
                    onClick={() => setShowEditor(false)}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* 모달 내용 */}
                <div className="flex flex-col lg:flex-row">
                  {/* 미리보기 */}
                  <div className="flex-1 p-5">
                    {generatedImage && (
                      <img
                        src={generatedImage}
                        alt="편집 미리보기"
                        className="w-full aspect-video object-cover rounded-lg"
                      />
                    )}
                  </div>

                  {/* 편집 도구 */}
                  <div className="w-full lg:w-64 p-5 border-t lg:border-t-0 lg:border-l border-white/10">
                    <h4 className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">편집 도구</h4>

                    <div className="space-y-2">
                      <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-left">
                        <Type className="w-5 h-5 text-red-400" />
                        <div>
                          <div className="text-sm font-medium">텍스트</div>
                          <div className="text-xs text-gray-500">제목, 부제목 넣기</div>
                        </div>
                      </button>

                      <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-left">
                        <Move className="w-5 h-5 text-orange-400" />
                        <div>
                          <div className="text-sm font-medium">위치 조정</div>
                          <div className="text-xs text-gray-500">요소 이동, 크기 조절</div>
                        </div>
                      </button>

                      <button className="w-full flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-left">
                        <Sticker className="w-5 h-5 text-yellow-400" />
                        <div>
                          <div className="text-sm font-medium">스티커</div>
                          <div className="text-xs text-gray-500">이모지, 아이콘 추가</div>
                        </div>
                      </button>
                    </div>

                    <div className="mt-5 space-y-2">
                      <button
                        onClick={handleDownload}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-500 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        <span>저장하기</span>
                      </button>
                      <button
                        onClick={() => setShowEditor(false)}
                        className="w-full px-4 py-2.5 rounded-lg bg-white/5 text-gray-400 text-sm hover:text-white hover:bg-white/10 transition-colors"
                      >
                        닫기
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 하단 푸터 */}
      <footer className="relative z-10 text-center py-5 text-gray-600 text-xs">
        <p>무료 유튜브 썸네일 메이커 ・ 썸네일 저작권은 원 제작자에게 있습니다</p>
      </footer>
    </div>
  );
}
