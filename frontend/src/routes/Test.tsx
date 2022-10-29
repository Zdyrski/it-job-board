import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const quillContainerData = [
  ['bold', 'italic', 'underline', 'strike', 'blockquote'],
  [
    { list: 'ordered' },
    { list: 'bullet' },
    { indent: '-4' },
    { indent: '+4' },
  ],
  ['link', 'image', 'video'],
  ['clean'],
];
function Test() {
  return (
    <div style={{ height: '200px' }}>
      <ReactQuill
        style={{ height: '100%' }}
        theme="snow"
        modules={{
          toolbar: {
            container: quillContainerData,
          },
        }}
      />
    </div>
  );
}

export default Test;
