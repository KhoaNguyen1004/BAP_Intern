// import React, { useState } from 'react';
// import { Button, Radio, Card, Input, Form } from 'antd';
// import Popup from '../../components/Popup';

// const ConfigSection = () => {
//   const template = {
//     logo: '111',
//     title: '112',
//     footer: '324',
//     section: [
//       {
//         type: '1',
//         title: 'default-title',
//         content1: 'default-content',
//         content2: ''
//       },
//       {
//         type: '2',
//         title: 'test2',
//         content1: 'contentaaaa',
//         content2: 'aaaaaaa'
//       }
//     ]
//   };
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedSection, setSelectedSection] = useState(template.section[0]);
//   const [form] = Form.useForm();

//   const handleOpen = () => {
//     setIsOpen(true);
//   };

//   const handleClose = () => {
//     setIsOpen(false);
//   };

//   const handleSectionChange = value => {
//     setSelectedSection(value);
//   };

//   return (
//     <div>
//       <button onClick={handleOpen}>Open Modal</button>
//       <Popup
//         title="Config Sections"
//         isOpen={isOpen}
//         onCancel={handleClose}
//         onConfirm={handleClose}
//         footer={[
//           <Button key="back" onClick={handleClose}>
//             Cancel
//           </Button>,
//           <Button key="submit" type="primary" onClick={handleClose}>
//             Save
//           </Button>
//         ]}
//       >
//         <div className="w-full">
//           <div className="">
//             <Form
//               form={form}
//               initialValues={selectedSection}
//               layout="vertical"
//               onFinish={values => console.log(values)}
//             >
//               <Form.Item label="Title" name="title">
//                 <Input />
//               </Form.Item>
//               <Form.Item label="Content 1" name="content1">
//                 <Input />
//               </Form.Item>
//               {selectedSection.type === '2' && (
//                 <Form.Item label="Content 2" name="content2">
//                   <Input />
//                 </Form.Item>
//               )}
//             </Form>
//           </div>
//           <div className="flex flex-wrap">
//             {template.section.map(section => (
//               <div className="w-full p-2" key={section.type}>
//                 <Card
//                   className="shadow-sm rounded-md border border-gray-200 p-2"
//                   key={section.type}
//                   onClick={() => handleSectionChange(section)}
//                 >
//                   <Radio.Group value={section.title}>
//                     <Radio value={section.title}>{section.title}</Radio>
//                   </Radio.Group>
//                 </Card>
//               </div>
//             ))}
//           </div>
//         </div>
//       </Popup>
//     </div>
//   );
// };

// export default ConfigSection;
import React, { useEffect, useContext } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getAllTemplates } from './templatesSlide';
import { LoadingContext } from '../../contexts/LoadingContext';

function ConfigSection() {
  const { setIsLoading } = useContext(LoadingContext);
  const dispatch = useAppDispatch();
  const { templates, status, error } = useAppSelector(state => state.templates);

  useEffect(() => {
    setIsLoading(true);
    dispatch(getAllTemplates())
      .unwrap()
      .finally(() => setIsLoading(false));
  }, [dispatch, setIsLoading]);

  return (
    <div>
      <h1>Config Section</h1>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>{error}</p>}
      {templates.length > 0 ? (
        templates.map(template => (
          <div key={template.id}>
            <h2>{template.name}</h2>
          </div>
        ))
      ) : (
        <p>No templates available</p>
      )}
    </div>
  );
}

export default ConfigSection;
