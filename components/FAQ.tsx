import React, { useState } from 'react';
import { PlusIcon, MinusIcon } from './icons';
import { SectionHeader } from './SectionHeader';

const faqData = [
  {
    q: "Is this safe to use?",
    a: "Absolutely. We meticulously verify all links to ensure they lead to official app stores or developer websites. We do not host copyrighted files and prioritize user safety above all."
  },
  {
    q: "Why do I need to verify?",
    a: "To maintain the quality and integrity of our service, some high-demand downloads may have a simple verification step. This helps us prevent automated abuse and ensure real users get fast, reliable access."
  },
  {
    q: "How do I install these mods?",
    a: "Once you download the file from the trusted source we link to, simply follow the standard installation instructions for your device (Android, iOS, or PC). Each platform has a straightforward process."
  },
  {
    q: "Will I get banned for using mods?",
    a: "While we link to mods from reputable developers who take anti-ban measures, there is always a small risk when using modified software in online games. We recommend using mods responsibly, for example, in offline modes where possible."
  }
];

const FAQItem: React.FC<{ item: typeof faqData[0], isOpen: boolean, onClick: () => void }> = ({ item, isOpen, onClick }) => {
  return (
    <div className="bg-slate-800/60 rounded-xl overflow-hidden">
      <button 
        className="w-full flex justify-between items-center text-left p-5"
        onClick={onClick}
        aria-expanded={isOpen}
      >
        <span className="font-medium text-white">{item.q}</span>
        {isOpen 
            ? <MinusIcon className={`w-5 h-5 text-slate-400 flex-shrink-0`} />
            : <PlusIcon className={`w-5 h-5 text-slate-400 flex-shrink-0`} />
        }
      </button>
      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}>
        <div className="px-5 pb-5 text-slate-400 text-sm">
          {item.a}
        </div>
      </div>
    </div>
  )
}

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <section id="faq" className="my-8 py-6">
        <SectionHeader title="Frequently Asked Questions" />
        <div className="space-y-3">
          {faqData.map((item, index) => (
            <FAQItem 
              key={index} 
              item={item} 
              isOpen={openIndex === index}
              onClick={() => handleClick(index)}
            />
          ))}
        </div>
    </section>
  );
};