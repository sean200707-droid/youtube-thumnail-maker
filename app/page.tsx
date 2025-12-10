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
  ExternalLink,
  Loader2,
  Play
} from "lucide-react";

// 스타일 옵션
const styleOptions = [
  { id: "eye-catching", emoji: "🔥", label: "눈에 띄는" },
  { id: "clean", emoji: "✨", label: "깔끔한" },
  { id: "daily", emoji: "📷", label: "일상" },
  { id: "professional", emoji: "💼", label: "전문적인" },
];

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleGenerate = useCallback(() => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setGeneratedImage(null);

    setTimeout(() => {
      setGeneratedImage(`https://picsum.photos/seed/${Date.now()}/1280/720`);
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
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950">
      {/* 배경 글로우 */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-red-600/10 rounded-full blur-[150px]" />
      </div>

      {/* 헤더 */}
      <header className="relative z-50 flex items-center justify-between px-6 sm:px-10 py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center shadow-lg shadow-red-600/20">
            <Play className="w-5 h-5 text-white fill-white" />
          </div>
          <span className="text-lg font-bold text-white tracking-tight">썸네일 메이커</span>
        </div>

        <a
          href="#"
          className="flex items-center gap-2 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-sm text-neutral-300 hover:text-white transition-all"
        >
          <ExternalLink className="w-4 h-4" />
          <span className="hidden sm:inline">썸네일 추출</span>
        </a>
      </header>

      {/* 메인 */}
      <main className="relative z-10 flex flex-col items-center px-6 sm:px-10">
        {/* 히어로 섹션 */}
        <motion.div
          className="w-full max-w-3xl text-center pt-16 sm:pt-24 lg:pt-32"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* 뱃지 */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/10 border border-red-600/20 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-red-400" />
            <span className="text-sm text-red-300 font-medium">무료로 바로 사용하세요</span>
          </div>

          {/* 메인 타이틀 */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6">
            유튜브 썸네일<br />
            <span className="bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent">
              쉽고 빠르게
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-neutral-400 leading-relaxed mb-12 max-w-xl mx-auto">
            영상 주제만 입력하세요.<br className="sm:hidden" />
            클릭을 부르는 썸네일이 완성됩니다.
          </p>

          {/* 입력 영역 */}
          <div className="w-full max-w-xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row items-stretch gap-3 p-2 bg-neutral-900/80 backdrop-blur-sm border border-neutral-700/50 rounded-2xl shadow-2xl shadow-black/20">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                placeholder="예: 서울 맛집 투어, 일본 여행 브이로그"
                className="flex-1 bg-transparent text-white placeholder:text-neutral-500 text-base sm:text-lg px-5 py-4 outline-none"
              />
              <motion.button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="flex items-center justify-center gap-2.5 px-8 py-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 text-white text-base font-semibold rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-red-600/20"
                whileTap={{ scale: 0.98 }}
              >
                {isGenerating ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Sparkles className="w-5 h-5" />
                )}
                <span>만들기</span>
              </motion.button>
            </div>
          </div>

          {/* 스타일 선택 */}
          <div className="flex items-center justify-center gap-3 flex-wrap mb-16">
            {styleOptions.map((style) => (
              <button
                key={style.id}
                onClick={() =>
                  setSelectedStyle(selectedStyle === style.id ? null : style.id)
                }
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium transition-all ${selectedStyle === style.id
                    ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
                    : "bg-neutral-800/80 text-neutral-300 hover:bg-neutral-700 hover:text-white border border-neutral-700"
                  }`}
              >
                <span className="text-base">{style.emoji}</span>
                <span>{style.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* 결과 영역 */}
        <AnimatePresence mode="wait">
          {(isGenerating || generatedImage) && (
            <motion.div
              className="w-full max-w-2xl mx-auto mb-20"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
            >
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center py-24 bg-neutral-900/60 backdrop-blur-sm rounded-2xl border border-neutral-700/50">
                  <Loader2 className="w-12 h-12 text-red-500 animate-spin mb-5" />
                  <p className="text-neutral-200 text-lg font-medium">썸네일 생성 중...</p>
                  <p className="text-neutral-500 text-sm mt-2">잠시만 기다려 주세요</p>
                </div>
              ) : generatedImage ? (
                <div
                  className="relative rounded-2xl overflow-hidden border border-neutral-700/50 shadow-2xl group"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <img
                    src={generatedImage}
                    alt="생성된 썸네일"
                    className="w-full aspect-video object-cover"
                  />

                  <div
                    className={`absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center gap-4 transition-opacity duration-200 ${isHovering ? "opacity-100" : "opacity-0"
                      }`}
                  >
                    <button
                      onClick={() => setShowEditor(true)}
                      className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-base font-medium rounded-xl transition-all"
                    >
                      <Pencil className="w-5 h-5" />
                      <span>편집하기</span>
                    </button>
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-500 text-white text-base font-medium rounded-xl transition-all shadow-lg shadow-red-600/20"
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

        {/* 편집 모달 */}
        <AnimatePresence>
          {showEditor && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEditor(false)}
            >
              <motion.div
                className="w-full max-w-3xl bg-neutral-900 rounded-2xl border border-neutral-700/50 overflow-hidden shadow-2xl"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-800">
                  <h3 className="text-lg font-bold text-white">썸네일 편집</h3>
                  <button
                    onClick={() => setShowEditor(false)}
                    className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-neutral-400" />
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

                  <div className="w-full lg:w-64 p-6 border-t lg:border-t-0 lg:border-l border-neutral-800">
                    <p className="text-sm text-neutral-500 mb-4 font-medium">편집 도구</p>

                    <div className="space-y-3">
                      <button className="w-full flex items-center gap-3 p-4 bg-neutral-800 hover:bg-neutral-700 rounded-xl text-left transition-colors">
                        <Type className="w-5 h-5 text-red-400" />
                        <span className="text-base text-white">텍스트 추가</span>
                      </button>

                      <button className="w-full flex items-center gap-3 p-4 bg-neutral-800 hover:bg-neutral-700 rounded-xl text-left transition-colors">
                        <Move className="w-5 h-5 text-blue-400" />
                        <span className="text-base text-white">위치 조정</span>
                      </button>

                      <button className="w-full flex items-center gap-3 p-4 bg-neutral-800 hover:bg-neutral-700 rounded-xl text-left transition-colors">
                        <Sticker className="w-5 h-5 text-yellow-400" />
                        <span className="text-base text-white">스티커</span>
                      </button>
                    </div>

                    <div className="mt-6">
                      <button
                        onClick={handleDownload}
                        className="w-full flex items-center justify-center gap-2 py-4 bg-red-600 hover:bg-red-500 text-white text-base font-semibold rounded-xl transition-colors"
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
      </main>

      {/* 푸터 */}
      <footer className="relative z-10 text-center py-12 text-neutral-600 text-sm">
        <p>© 2024 유튜브 썸네일 메이커</p>
      </footer>
    </div>
  );
}
