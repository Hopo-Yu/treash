import React, { useState, useRef } from 'react';

const TopBarComponent: React.FC = () => {
  const [themeInput, setThemeInput] = useState<string>('');
  const [precisionInput, setPrecisionInput] = useState<string>('');
  const [showThemesDropdown, setShowThemesDropdown] = useState<boolean>(false);
  const [showPrecisionDropdown, setShowPrecisionDropdown] = useState<boolean>(false);

  const themeInputRef = useRef<HTMLInputElement>(null);
  const precisionInputRef = useRef<HTMLInputElement>(null);

  const themes = ['Literature', 'Politics', 'Science', 'Art', 'Economics'];
  const precisions = ['1000', '500', '100', '50', '10'];

  return (
    <div className="top-bar">
      <div className="selector">
        <input
          type="text"
          value={themeInput}
          onChange={(e) => setThemeInput(e.target.value)}
          onFocus={() => setShowThemesDropdown(true)}
          onBlur={() => setTimeout(() => setShowThemesDropdown(false), 150)}
          ref={themeInputRef}
        />
        <button onClick={() => setShowThemesDropdown(!showThemesDropdown)}>▼</button>
        {showThemesDropdown && (
          <div className="dropdown">
            {themes.filter(theme => theme.toLowerCase().includes(themeInput.toLowerCase())).map(theme => (
              <div key={theme} onClick={() => { setThemeInput(theme); setShowThemesDropdown(false); }}>{theme}</div>
            ))}
          </div>
        )}
      </div>

      <div className="selector">
        <input
          type="text"
          value={precisionInput}
          onChange={(e) => setPrecisionInput(e.target.value)}
          onFocus={() => setShowPrecisionDropdown(true)}
          onBlur={() => setTimeout(() => setShowPrecisionDropdown(false), 150)}
          ref={precisionInputRef}
        />
        <button onClick={() => setShowPrecisionDropdown(!showPrecisionDropdown)}>▼</button>
        {showPrecisionDropdown && (
          <div className="dropdown">
            {precisions.filter(precision => precision.includes(precisionInput)).map(precision => (
              <div key={precision} onClick={() => { setPrecisionInput(precision); setShowPrecisionDropdown(false); }}>{precision}</div>
            ))}
          </div>
        )}
      </div>

      <div className="timeline-buttons">
        {/* Example buttons for the timeline. Adjust as needed */}
        <button>1000-2000</button>
        <button>2000-3000</button>
        {/* ... */}
      </div>
    </div>
  );
};

export default TopBarComponent;
