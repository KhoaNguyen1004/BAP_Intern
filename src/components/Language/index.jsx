import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown, Button } from 'antd';
import { Flag } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

function LanguagePicker() {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState('en');
  const flag = language === 'vn' ? 'vn' : 'us';

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
  };

  const menuItems = [
    {
      key: 'vn',
      label: (
        <>
          <Flag name="vn" /> Vietnamese
        </>
      ),
      onClick: () => handleLanguageChange('vn'),
    },
    {
      key: 'en',
      label: (
        <>
          <Flag name="us" /> English
        </>
      ),
      onClick: () => handleLanguageChange('en'),
    },
  ];

  return (
    <div className="Language-picker">
      <Dropdown
        menu={{ items: menuItems }}  // Use `menu` prop with `items`
        className="w-14 h-14 border flex items-center justify-center"
        placement="topRight"
        arrow
      >
        <Button>
          <Flag name={flag} />
        </Button>
      </Dropdown>
    </div>
  );
}

export default LanguagePicker;
