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

  // 썸네일 생성
  const handleGenerate = useCallback(() => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setGeneratedImage(null);

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
    link.download = `thumbnail_${Date.now()}.jpg`;
    link.target = "_blank";
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative">
      {/* 배경 */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-red-600/8 to-transparent rounded-full blur-3xl" />
      </div>

      {/* 헤더 */}
      <header className="relative z-50 flex items-center justify-between px-5 py-4 md:px-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-red-600 rounded-md flex items-center justify-center">
            <Play className="w-4 h-4 text-white fill-white" />
          </div>
          <span className="text-sm font-semibold text-white">썸네일 메이커</span>
        </div>

        <a
          href="#"
          className="flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>썸네일 추출</span>
        </a>
      </header>

      {/* 메인 */}
      <main className="relative z-10 flex flex-col items-center pt-20 sm:pt-32 pb-20 px-5">
        <motion.div
          className="w-full max-w-2xl text-center"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* 제목 */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 leading-snug tracking-tight">
            유튜브 썸네일,<br />
            <span className="text-red-500">쉽고 빠르게</span> 만드세요
          </h1>

          <p className="text-neutral-400 text-sm sm:text-base mb-10 leading-relaxed">
            영상 주제를 입력하면 눈길을 끄는 썸네일이 완성됩니다.
          </p>

          {/* 입력 영역 */}
          <div className="w-full max-w-lg mx-auto mb-6">
            <div className="flex items-center gap-2 p-1.5 bg-neutral-900 border border-neutral-800 rounded-xl focus-within:border-neutral-700 transition-colors">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                placeholder="예: 서울 카페 투어, 일본 여행 브이로그"
                className="flex-1 bg-transparent text-white placeholder:text-neutral-500 text-sm px-3 py-3 outline-none"
              />
              <motion.button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-red-600 hover:bg-red-500 text-white text-sm font-medium rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                whileTap={{ scale: 0.98 }}
              >
                {isGenerating ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
                <span>만들기</span>
              </motion.button>
            </div>
          </div>

          {/* 스타일 선택 */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {styleOptions.map((style) => (
              <button
                key={style.id}
                onClick={() =>
                  setSelectedStyle(selectedStyle === style.id ? null : style.id)
                }
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs transition-all ${selectedStyle === style.id
                    ? "bg-red-600 text-white"
                    : "bg-neutral-800 text-neutral-300 hover:bg-neutral-700"
                  }`}
              >
                <span>{style.emoji}</span>
                <span>{style.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* 결과 */}
        <AnimatePresence mode="wait">
          {(isGenerating || generatedImage) && (
            <motion.div
              className="w-full max-w-xl mx-auto mt-12"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              {isGenerating ? (
                <div className="flex flex-col items-center justify-center py-20 bg-neutral-900/50 rounded-xl border border-neutral-800">
                  <Loader2 className="w-8 h-8 text-red-500 animate-spin mb-3" />
                  <p className="text-neutral-300 text-sm">썸네일 생성 중...</p>
                </div>
              ) : generatedImage ? (
                <div
                  className="relative rounded-xl overflow-hidden border border-neutral-800 group"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <img
                    src={generatedImage}
                    alt="생성된 썸네일"
                    className="w-full aspect-video object-cover"
                  />

                  {/* 오버레이 */}
                  <div
                    className={`absolute inset-0 bg-black/60 flex items-center justify-center gap-3 transition-opacity ${isHovering ? "opacity-100" : "opacity-0"
                      }`}
                  >
                    <button
                      onClick={() => setShowEditor(true)}
                      className="flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white text-sm rounded-lg transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                      <span>편집</span>
                    </button>
                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-1.5 px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-sm rounded-lg transition-colors"
                    >
                      <Download className="w-4 h-4" />
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
              className="fixed inset-0 z-50 flex items-center justify-center p-5 bg-black/80"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowEditor(false)}
            >
              <motion.div
                className="w-full max-w-2xl bg-neutral-900 rounded-xl border border-neutral-800 overflow-hidden"
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* 헤더 */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-800">
                  <h3 className="text-sm font-semibold text-white">썸네일 편집</h3>
                  <button
                    onClick={() => setShowEditor(false)}
                    className="p-1.5 hover:bg-neutral-800 rounded-md transition-colors"
                  >
                    <X className="w-4 h-4 text-neutral-400" />
                  </button>
                </div>

                {/* 내용 */}
                <div className="flex flex-col md:flex-row">
                  <div className="flex-1 p-5">
                    {generatedImage && (
                      <img
                        src={generatedImage}
                        alt="미리보기"
                        className="w-full aspect-video object-cover rounded-lg"
                      />
                    )}
                  </div>

                  <div className="w-full md:w-56 p-5 border-t md:border-t-0 md:border-l border-neutral-800">
                    <p className="text-xs text-neutral-500 mb-3">도구</p>

                    <div className="space-y-2">
                      <button className="w-full flex items-center gap-2 p-2.5 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-left transition-colors">
                        <Type className="w-4 h-4 text-red-400" />
                        <span className="text-sm text-neutral-200">텍스트 추가</span>
                      </button>

                      <button className="w-full flex items-center gap-2 p-2.5 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-left transition-colors">
                        <Move className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-neutral-200">위치 조정</span>
                      </button>

                      <button className="w-full flex items-center gap-2 p-2.5 bg-neutral-800 hover:bg-neutral-700 rounded-lg text-left transition-colors">
                        <Sticker className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm text-neutral-200">스티커</span>
                      </button>
                    </div>

                    <div className="mt-5">
                      <button
                        onClick={handleDownload}
                        className="w-full flex items-center justify-center gap-1.5 py-2.5 bg-red-600 hover:bg-red-500 text-white text-sm font-medium rounded-lg transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        <span>저장</span>
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
      <footer className="relative z-10 text-center pb-6 text-neutral-600 text-xs">
        <p>© 2024 유튜브 썸네일 메이커</p>
      </footer>
    </div>
  );
}
