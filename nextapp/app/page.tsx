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
  ExternalLink
} from "lucide-react";

// Template types
const templates = [
  { id: "aggro", emoji: "🔥", label: "어그로형" },
  { id: "illustration", emoji: "🎨", label: "일러스트형" },
  { id: "vlog", emoji: "📷", label: "브이로그형" },
  { id: "business", emoji: "💼", label: "비즈니스형" },
];

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Simulate AI generation
  const handleGenerate = useCallback(() => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setGeneratedImage(null);

    // Simulate 2-second generation delay
    setTimeout(() => {
      // Use picsum for a random placeholder image
      setGeneratedImage(`https://picsum.photos/seed/${Date.now()}/1280/720`);
      setIsGenerating(false);
    }, 2000);
  }, [prompt]);

  // Handle download
  const handleDownload = () => {
    if (!generatedImage) return;

    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = `thumbnail_${Date.now()}.jpg`;
    link.target = "_blank";
    link.click();
  };

  // Handle edit mode
  const handleEdit = () => {
    setShowEditor(true);
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] relative overflow-hidden">
      {/* Background Gradient Orbs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-32 -right-32 w-96 h-96 bg-[#7000FF]/30 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#00F0FF]/20 rounded-full blur-[120px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Navigation Bar */}
      <motion.nav
        className="relative z-50 flex items-center justify-between px-6 py-4 md:px-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FF0000] rounded-lg flex items-center justify-center shadow-lg shadow-red-500/30">
            <ImageIcon className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold hidden sm:block">썸네일 메이커</span>
        </div>

        {/* Extraction Tool Link */}
        <motion.a
          href="#"
          className="flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-[#AAAAAA] hover:text-white transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ExternalLink className="w-4 h-4" />
          <span className="hidden sm:inline">유튜브 썸네일 추출기</span>
          <span className="sm:hidden">추출기</span>
        </motion.a>
      </motion.nav>

      {/* Main Content - Centered Hero */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 pb-16">
        {/* Hero Section */}
        <motion.div
          className="w-full max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Headline */}
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            style={{ fontFamily: "'Gmarket Sans', sans-serif" }}
          >
            <span className="text-white">제목만 쓰세요.</span>
            <br />
            <span className="gradient-text">썸네일은 AI가 만듭니다.</span>
          </h1>

          <p className="text-[#AAAAAA] text-base sm:text-lg mb-8 max-w-xl mx-auto">
            영상 제목이나 키워드를 입력하면, AI가 클릭을 부르는 썸네일을 자동으로 생성합니다
          </p>

          {/* Input Section */}
          <div className="w-[90%] sm:w-[80%] mx-auto mb-6">
            <motion.div
              className="relative flex items-center gap-3 p-2 rounded-2xl glass border border-white/10 focus-within:border-[#00F0FF]/50 transition-all duration-300"
              whileHover={{ scale: 1.01 }}
            >
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                placeholder="예: 먹방 브이로그, 매운 떡볶이"
                className="flex-1 bg-transparent text-white placeholder:text-[#666] text-base sm:text-lg px-4 py-4 outline-none"
              />
              <motion.button
                onClick={handleGenerate}
                disabled={isGenerating || !prompt.trim()}
                className="flex items-center gap-2 px-6 py-4 rounded-xl ai-gradient-bg text-white font-semibold text-base whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed neon-glow-hover transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Sparkles className="w-5 h-5" />
                <span>생성하기</span>
              </motion.button>
            </motion.div>
          </div>

          {/* Quick Templates */}
          <div className="w-[90%] sm:w-[80%] mx-auto overflow-x-auto chips-scroll pb-2">
            <div className="flex items-center justify-center gap-3 min-w-max px-4">
              {templates.map((template) => (
                <motion.button
                  key={template.id}
                  onClick={() => setSelectedTemplate(
                    selectedTemplate === template.id ? null : template.id
                  )}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${selectedTemplate === template.id
                      ? "ai-gradient-bg text-white neon-glow"
                      : "glass text-[#AAAAAA] hover:text-white hover:border-white/20"
                    }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>{template.emoji}</span>
                  <span>{template.label}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Result Section */}
        <AnimatePresence mode="wait">
          {(isGenerating || generatedImage) && (
            <motion.div
              className="w-full max-w-3xl mx-auto mt-12 px-4"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {isGenerating ? (
                /* Loading State */
                <div className="flex flex-col items-center justify-center py-20 glass rounded-2xl">
                  <div className="neon-spinner mb-6" />
                  <p className="text-[#AAAAAA] text-lg">썸네일을 생성하고 있습니다...</p>
                  <p className="text-[#666] text-sm mt-2">AI가 최적의 디자인을 찾고 있어요</p>
                </div>
              ) : generatedImage ? (
                /* Generated Image */
                <div
                  className="relative rounded-2xl overflow-hidden image-container"
                  onMouseEnter={() => setIsHovering(true)}
                  onMouseLeave={() => setIsHovering(false)}
                >
                  <motion.img
                    src={generatedImage}
                    alt="Generated Thumbnail"
                    className="w-full aspect-video object-cover"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  />

                  {/* Hover Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4 image-overlay"
                    initial={false}
                    animate={{ opacity: isHovering ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.button
                      onClick={handleEdit}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl glass border border-white/20 text-white font-medium hover:bg-white/10 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Pencil className="w-5 h-5" />
                      <span>텍스트 수정</span>
                    </motion.button>
                    <motion.button
                      onClick={handleDownload}
                      className="flex items-center gap-2 px-6 py-3 rounded-xl ai-gradient-bg text-white font-medium neon-glow-hover transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Download className="w-5 h-5" />
                      <span>다운로드</span>
                    </motion.button>
                  </motion.div>
                </div>
              ) : null}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Editor Modal */}
        <AnimatePresence>
          {showEditor && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="relative w-full max-w-4xl bg-[#1a1a1a] rounded-2xl overflow-hidden"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                {/* Editor Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                  <h3 className="text-lg font-bold">썸네일 편집</h3>
                  <button
                    onClick={() => setShowEditor(false)}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Editor Content */}
                <div className="flex flex-col lg:flex-row">
                  {/* Preview */}
                  <div className="flex-1 p-6">
                    {generatedImage && (
                      <img
                        src={generatedImage}
                        alt="Edit Preview"
                        className="w-full aspect-video object-cover rounded-xl"
                      />
                    )}
                  </div>

                  {/* Controls */}
                  <div className="w-full lg:w-72 p-6 border-t lg:border-t-0 lg:border-l border-white/10">
                    <h4 className="text-sm font-semibold text-[#AAAAAA] mb-4">편집 도구</h4>

                    <div className="space-y-3">
                      <button className="w-full flex items-center gap-3 p-3 rounded-xl glass hover:bg-white/10 transition-colors text-left">
                        <Type className="w-5 h-5 text-[#00F0FF]" />
                        <div>
                          <div className="font-medium">텍스트</div>
                          <div className="text-xs text-[#666]">제목과 부제목 편집</div>
                        </div>
                      </button>

                      <button className="w-full flex items-center gap-3 p-3 rounded-xl glass hover:bg-white/10 transition-colors text-left">
                        <Move className="w-5 h-5 text-[#7000FF]" />
                        <div>
                          <div className="font-medium">위치</div>
                          <div className="text-xs text-[#666]">요소 이동 및 크기 조절</div>
                        </div>
                      </button>

                      <button className="w-full flex items-center gap-3 p-3 rounded-xl glass hover:bg-white/10 transition-colors text-left">
                        <Sticker className="w-5 h-5 text-[#FF0000]" />
                        <div>
                          <div className="font-medium">스티커</div>
                          <div className="text-xs text-[#666]">이모지와 아이콘 추가</div>
                        </div>
                      </button>
                    </div>

                    <div className="mt-6 space-y-3">
                      <button
                        onClick={handleDownload}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl ai-gradient-bg text-white font-semibold neon-glow-hover transition-all"
                      >
                        <Download className="w-5 h-5" />
                        <span>다운로드</span>
                      </button>
                      <button
                        onClick={() => setShowEditor(false)}
                        className="w-full px-4 py-3 rounded-xl glass text-[#AAAAAA] hover:text-white transition-colors"
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

      {/* Footer */}
      <footer className="relative z-10 text-center py-6 text-[#666] text-sm">
        <p>© 2024 YouTube Thumbnail Maker. 썸네일 저작권은 원 제작자에게 있습니다.</p>
      </footer>
    </div>
  );
}
