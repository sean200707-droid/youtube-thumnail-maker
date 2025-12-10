"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Download,
  Pencil,
  X,
  Type,
  Sticker,
  Move,
  Loader2,
  Youtube
} from "lucide-react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [showEditor, setShowEditor] = useState(false);

  const handleGenerate = useCallback(() => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setGeneratedImage(null);

    // 키워드를 영어로 간단 변환 (한글 → 영어 키워드)
    const keywords = prompt.trim().replace(/\s+/g, ',');

    setTimeout(() => {
      // 데모용 이미지 (항상 로드됨)
      const seed = Date.now();
      setGeneratedImage(`https://picsum.photos/seed/${seed}/1280/720`);
      setIsGenerating(false);
    }, 2000);
  }, [prompt]);

  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = `thumbnail_${Date.now()}.jpg`;
    link.target = "_blank";
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex flex-col">
      {/* 헤더 */}
      <header className="flex items-center justify-between px-6 lg:px-12 h-16 border-b border-white/5">
        <div className="flex items-center gap-2">
          <Youtube className="w-8 h-8 text-red-600" />
          <span className="text-xl font-bold text-white">썸네일 메이커</span>
        </div>
      </header>

      {/* 메인 */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16">
        <div className="w-full max-w-[640px] mx-auto">

          {/* 타이틀 영역 */}
          <div className="text-center mb-16">
            <h1 className="text-[42px] sm:text-[56px] font-bold text-white leading-[1.1] mb-6">
              유튜브 썸네일<br />
              <span className="text-red-500">쉽고 빠르게</span> 만들기
            </h1>

            <p className="text-[18px] sm:text-[20px] text-[#aaa] leading-relaxed">
              영상 주제만 입력하면 끝!
            </p>
          </div>

          {/* 입력 영역 */}
          <div className="mb-20">
            <div className="bg-[#1a1a1a] border border-[#333] rounded-2xl p-3">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                placeholder="예: 서울 카페 투어, 일본 여행 브이로그"
                className="w-full bg-transparent text-white text-[18px] px-4 py-4 outline-none placeholder:text-[#666]"
              />

              <div className="flex justify-end mt-2">
                <button
                  onClick={handleGenerate}
                  disabled={isGenerating || !prompt.trim()}
                  className="flex items-center gap-3 px-8 py-4 bg-red-600 hover:bg-red-700 disabled:bg-red-600/50 text-white text-[16px] font-semibold rounded-xl transition-colors disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Sparkles className="w-5 h-5" />
                  )}
                  <span>썸네일 만들기</span>
                </button>
              </div>
            </div>
          </div>

          {/* 결과 영역 */}
          <AnimatePresence mode="wait">
            {(isGenerating || generatedImage) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-12"
              >
                {isGenerating ? (
                  <div className="bg-[#1a1a1a] border border-[#333] rounded-2xl p-16 text-center">
                    <Loader2 className="w-12 h-12 text-red-500 animate-spin mx-auto mb-6" />
                    <p className="text-[18px] text-white mb-2">썸네일 생성 중</p>
                    <p className="text-[14px] text-[#888]">잠시만 기다려 주세요</p>
                  </div>
                ) : generatedImage ? (
                  <div className="space-y-6">
                    <div className="rounded-2xl overflow-hidden border border-[#333]">
                      <img
                        src={generatedImage}
                        alt="생성된 썸네일"
                        className="w-full aspect-video object-cover"
                      />
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => setShowEditor(true)}
                        className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#1a1a1a] hover:bg-[#252525] border border-[#333] text-white text-[16px] font-medium rounded-xl transition-colors"
                      >
                        <Pencil className="w-5 h-5" />
                        <span>편집하기</span>
                      </button>
                      <button
                        onClick={handleDownload}
                        className="flex-1 flex items-center justify-center gap-2 py-4 bg-red-600 hover:bg-red-700 text-white text-[16px] font-medium rounded-xl transition-colors"
                      >
                        <Download className="w-5 h-5" />
                        <span>다운로드</span>
                      </button>
                    </div>
                  </div>
                ) : null}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="text-center py-8 text-[#555] text-[14px] border-t border-white/5">
        <p>© 2024 유튜브 썸네일 메이커</p>
      </footer>

      {/* 편집 모달 */}
      <AnimatePresence>
        {showEditor && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/90"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowEditor(false)}
          >
            <motion.div
              className="w-full max-w-[900px] bg-[#181818] rounded-2xl overflow-hidden"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-[#333]">
                <h3 className="text-[18px] font-bold text-white">썸네일 편집</h3>
                <button
                  onClick={() => setShowEditor(false)}
                  className="p-2 hover:bg-[#333] rounded-lg transition-colors"
                >
                  <X className="w-6 h-6 text-[#888]" />
                </button>
              </div>

              <div className="flex flex-col lg:flex-row">
                <div className="flex-1 p-6">
                  {generatedImage && (
                    <img
                      src={generatedImage}
                      alt="미리보기"
                      className="w-full aspect-video object-cover rounded-xl"
                    />
                  )}
                </div>

                <div className="w-full lg:w-[280px] p-6 border-t lg:border-t-0 lg:border-l border-[#333]">
                  <p className="text-[14px] text-[#888] mb-5">편집 도구</p>

                  <div className="space-y-3">
                    <button className="w-full flex items-center gap-4 p-4 bg-[#252525] hover:bg-[#333] rounded-xl text-left transition-colors">
                      <Type className="w-6 h-6 text-red-400" />
                      <span className="text-[16px] text-white">텍스트 추가</span>
                    </button>

                    <button className="w-full flex items-center gap-4 p-4 bg-[#252525] hover:bg-[#333] rounded-xl text-left transition-colors">
                      <Move className="w-6 h-6 text-blue-400" />
                      <span className="text-[16px] text-white">위치 조정</span>
                    </button>

                    <button className="w-full flex items-center gap-4 p-4 bg-[#252525] hover:bg-[#333] rounded-xl text-left transition-colors">
                      <Sticker className="w-6 h-6 text-yellow-400" />
                      <span className="text-[16px] text-white">스티커</span>
                    </button>
                  </div>

                  <div className="mt-8">
                    <button
                      onClick={() => {
                        handleDownload();
                        setShowEditor(false);
                      }}
                      className="w-full flex items-center justify-center gap-2 py-4 bg-red-600 hover:bg-red-700 text-white text-[16px] font-semibold rounded-xl transition-colors"
                    >
                      <Download className="w-5 h-5" />
                      <span>저장하기</span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
