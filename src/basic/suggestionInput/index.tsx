import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css"; // 创建一个 CSS 文件来定义样式

interface SuggestionProps {
  suggestions: string[];
}

const SuggestionInput: React.FC<SuggestionProps> = ({ suggestions }) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (inputRef.current && suggestionRef.current) {
        const rect = inputRef.current.getBoundingClientRect();
        suggestionRef.current.style.width = `${rect.width}px`;
        suggestionRef.current.style.top = `${rect.bottom + window.scrollY}px`;
        suggestionRef.current.style.left = `${rect.left + window.scrollX}px`;
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    if (value) {
      setFilteredSuggestions(
        suggestions.filter((suggestion) =>
          suggestion.toLowerCase().includes(value.toLowerCase())
        )
      );
      setIsOpen(true);
    } else {
      setIsOpen(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputValue(suggestion);
    setIsOpen(false);
  };

  const renderSuggestions = () => (
    <div
      className="h-[300px] overflow-y-scroll absolute inset-x-auto top-[40px] bottom-0 border z-50"
      ref={suggestionRef}
    >
      {filteredSuggestions.map((suggestion, index) => (
        <div
          key={index}
          className="p-4 cursor-pointer hover:bg-gray-200"
          onClick={() => handleSuggestionClick(suggestion)}
        >
          {highlightText(suggestion, inputValue)}
        </div>
      ))}
    </div>
  );

  const highlightText = (text: string, highlight: string) => {
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {parts.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={index} className="font-bold bg-yellow-300">
              {part}
            </span>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </span>
    );
  };

  return (
    <div className="relative flex w-full h-full border resize overflow-auto">
      <input
        type="text"
        className="flex-1"
        value={inputValue}
        onChange={handleInputChange}
        ref={inputRef}
      />
      {isOpen && ReactDOM.createPortal(renderSuggestions(), document.body)}
    </div>
  );
};

export default SuggestionInput;
