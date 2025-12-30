import React, { useState } from 'react';
import { 
  ChevronLeft, 
  RotateCcw, 
  CheckCircle2, 
  Stethoscope, 
  Activity,
  AlertCircle,
  Lightbulb
} from 'lucide-react';

const App = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState(Array(5).fill(null));
  const [showResult, setShowResult] = useState(false);

  // IIEF-5 問題與選項
  const questions = [
    {
      id: 1,
      text: "在過去的六個月內，您對於勃起並維持勃起有多少信心？",
      options: [
        { label: "非常低", score: 1 },
        { label: "低", score: 2 },
        { label: "中等", score: 3 },
        { label: "高", score: 4 },
        { label: "非常高", score: 5 }
      ]
    },
    {
      id: 2,
      text: "在過去的六個月內，當您在性刺激下勃起時，有多少次硬度足以進入陰道？",
      options: [
        { label: "幾乎沒有或從未", score: 1 },
        { label: "少數幾次（少於一半時間）", score: 2 },
        { label: "有時候（約一半時間）", score: 3 },
        { label: "多數幾次（多於一半時間）", score: 4 },
        { label: "幾乎每次或每次", score: 5 }
      ]
    },
    {
      id: 3,
      text: "在過去的六個月內，性交過程中，您在進入後有多少次能維持勃起？",
      options: [
        { label: "幾乎沒有或從未", score: 1 },
        { label: "少數幾次（少於一半時間）", score: 2 },
        { label: "有時候（約一半時間）", score: 3 },
        { label: "多數幾次（多於一半時間）", score: 4 },
        { label: "幾乎每次或每次", score: 5 }
      ]
    },
    {
      id: 4,
      text: "在過去的六個月內，性交過程中，維持勃起直到性交完成有多少困難？",
      options: [
        { label: "極度困難", score: 1 },
        { label: "非常困難", score: 2 },
        { label: "困難", score: 3 },
        { label: "稍微困難", score: 4 },
        { label: "不困難", score: 5 }
      ]
    },
    {
      id: 5,
      text: "在過去的六個月內，嘗試性交時，您感到滿意的次數有多少？",
      options: [
        { label: "幾乎沒有或從未", score: 1 },
        { label: "少數幾次（少於一半時間）", score: 2 },
        { label: "有時候（約一半時間）", score: 3 },
        { label: "多數幾次（多於一半時間）", score: 4 },
        { label: "幾乎每次或每次", score: 5 }
      ]
    }
  ];

  const handleOptionSelect = (score) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = score;
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 300);
    } else {
      setShowResult(true);
    }
  };

  const calculateTotal = () => answers.reduce((a, b) => a + (b || 0), 0);

  const getDiagnosis = (total) => {
    if (total <= 7) return { 
      label: "嚴重勃起功能障礙", 
      color: "text-red-600", 
      bg: "bg-red-50", 
      border: "border-red-200",
      advice: "目前的狀況可能顯著影響您的生活品質。這往往與心血管、代謝或賀爾蒙因素有關。建議盡快預約門診，由醫師進行完整的血液檢查與超音波評估，找出核心病因並制定積極的治療計畫。"
    };
    if (total <= 11) return { 
      label: "中度勃起功能障礙", 
      color: "text-orange-700", 
      bg: "bg-orange-50", 
      border: "border-orange-200",
      advice: "您的數據顯示勃起功能已有明顯下降。除了調整生活型態（如戒菸、適度運動）外，第一線口服藥物通常能有良好的輔助效果。建議門診諮詢醫師，評估是否需要輔以體外震波治療來改善血管健康。"
    };
    if (total <= 16) return { 
      label: "輕度至中度勃起功能障礙", 
      color: "text-amber-600", 
      bg: "bg-amber-50", 
      border: "border-amber-200",
      advice: "您在性行為過程中可能感到不穩定。這通常是生理與心理壓力的綜合表現。建議維持規律作息並適量補充鋅與精胺酸。若持續發生建議尋求專科醫師協助，評估是否因微循環不良導致，並儘早介入治療。"
    };
    if (total <= 21) return { 
      label: "輕度勃起功能障礙", 
      color: "text-blue-600", 
      bg: "bg-blue-50", 
      border: "border-blue-200",
      advice: "目前的狀況多屬於暫時性或初期。通常與近期工作壓力、焦慮或體力下降有關。建議增加有氧運動（如跑步、游泳）並確保充足睡眠。若情況未改善，可諮詢醫師進行預防性的血管健康評估。"
    };
    return { 
      label: "勃起功能正常", 
      color: "text-green-600", 
      bg: "bg-green-50", 
      border: "border-green-200",
      advice: "恭喜！您的分數顯示功能相當優異。建議繼續保持健康的飲食、穩定的運動習慣，並維持良好的心理狀態，這是維護男性健康最長久的基石。定期健康檢查即可。"
    };
  };

  const resetQuiz = () => {
    setAnswers(Array(5).fill(null));
    setCurrentStep(0);
    setShowResult(false);
  };

  const totalScore = calculateTotal();
  const diagnosis = getDiagnosis(totalScore);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 font-sans text-slate-900">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-500 text-white rounded-2xl shadow-lg mb-4">
            <Activity size={32} />
          </div>
          <h1 className="text-2xl font-black tracking-tight">IIEF-5 國際勃起功能指標</h1>
          <p className="text-slate-500 mt-2 text-sm font-medium tracking-wide uppercase">林醫師診所 · 專業自我檢測系統</p>
        </div>

        {!showResult ? (
          <div className="bg-white rounded-[32px] shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
            {/* Progress Bar */}
            <div className="h-2 bg-slate-100 w-full">
              <div 
                className="h-full bg-orange-500 transition-all duration-500 ease-in-out" 
                style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
              ></div>
            </div>

            <div className="p-8 md:p-10">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-bold text-orange-500 bg-orange-50 px-3 py-1 rounded-full uppercase tracking-tighter">
                  第 {currentStep + 1} 題 / 共 5 題
                </span>
              </div>

              <h2 className="text-xl md:text-2xl font-bold mb-8 leading-snug text-slate-900">
                {questions[currentStep].text}
              </h2>

              <div className="space-y-3">
                {questions[currentStep].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(option.score)}
                    className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 group flex justify-between items-center ${
                      answers[currentStep] === option.score 
                      ? 'border-orange-500 bg-orange-50 text-orange-700' 
                      : 'border-slate-50 bg-slate-50 hover:border-orange-200 hover:bg-white text-slate-700'
                    }`}
                  >
                    <span className="font-bold">{option.label}</span>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                      answers[currentStep] === option.score ? 'border-orange-500 bg-orange-500' : 'border-slate-300 group-hover:border-orange-300'
                    }`}>
                      {answers[currentStep] === option.score && <CheckCircle2 size={14} className="text-white" />}
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-between mt-10">
                <button 
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className={`flex items-center gap-1 font-bold text-sm transition-colors ${currentStep === 0 ? 'text-slate-200' : 'text-slate-400 hover:text-orange-500'}`}
                >
                  <ChevronLeft size={18} /> 上一題
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-[32px] shadow-2xl shadow-slate-300 border border-slate-100 overflow-hidden">
            <div className={`p-10 text-center ${diagnosis.bg}`}>
              <p className="text-sm font-bold text-slate-500 mb-2">檢測完成 · 總得分</p>
              <div className="text-7xl font-black text-slate-900 mb-4">{totalScore}</div>
              <div className={`inline-block px-6 py-2 rounded-full border-2 font-black text-lg ${diagnosis.color} ${diagnosis.border} bg-white shadow-sm`}>
                {diagnosis.label}
              </div>
            </div>

            <div className="p-8 md:p-10">
              <div className="space-y-8 text-slate-600">
                {/* 醫師建議區塊 */}
                <div className="relative p-6 rounded-3xl bg-orange-50 border border-orange-100 overflow-hidden">
                  <div className="absolute top-0 right-0 p-3 text-orange-100">
                    <Lightbulb size={48} />
                  </div>
                  <div className="relative z-10">
                    <h4 className="text-orange-600 font-black mb-3 flex items-center gap-2">
                      <Lightbulb size={18} /> 醫師建議處理方式
                    </h4>
                    <p className="text-slate-700 text-[15px] leading-relaxed font-medium">
                      {diagnosis.advice}
                    </p>
                  </div>
                </div>

                {/* 注意事項 */}
                <div className="flex gap-4 p-5 bg-slate-100 rounded-2xl border border-slate-200">
                  <AlertCircle className="text-slate-400 flex-shrink-0" size={20} />
                  <p className="text-xs text-slate-500 leading-relaxed italic">
                    註：此工具僅為初步篩檢，不能取代醫師專業診斷。檢測結果可能受當日身心狀態影響。
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button 
                    onClick={resetQuiz}
                    className="flex items-center justify-center gap-2 p-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all"
                  >
                    <RotateCcw size={18} /> 重新檢測
                  </button>
                  <button 
                    className="flex items-center justify-center gap-2 p-4 bg-orange-500 text-white rounded-2xl font-bold shadow-lg shadow-orange-200 hover:bg-orange-600 transition-all"
                  >
                    <Stethoscope size={18} /> 預約門診諮詢
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <p className="text-center text-slate-400 text-[11px] mt-8 tracking-widest">
          © 2025 DR. LIN UROLOGY CLINIC · 專業醫療顧問
        </p>
      </div>
    </div>
  );
};

export default App;