import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown, Button } from 'antd';
import { Flag } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

function LanguagePicker() {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(
    localStorage.getItem('language') || 'us'
  );
  const flag = language === 'vn' ? 'vn' : 'us';

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);

  const handleLanguageChange = (lang) => {
    localStorage.setItem('language', lang);
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
      onClick: () => handleLanguageChange('vn')
    },
    {
      key: 'us',
      label: (
        <>
          <Flag name="us" /> English
        </>
      ),
      onClick: () => handleLanguageChange('us')
    }
  ];

  return (
    // <div className="shadow-2xl rounded-full ">
    <Dropdown
      menu={{ items: menuItems }} // Use `menu` prop with `items`
      className="shadow-2xl"
      placement="topRight"
      arrow
    >
      <Button className="" size="large" shape="circle">
        <Flag name={flag} />
      </Button>
    </Dropdown>
    // </div>
  );
}

export default LanguagePicker;