import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { props } from "./interface";

const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});

export const RichTextEditor: React.FC<props> = ({ setMessage }) => {
  return (
    <QuillNoSSRWrapper
      theme="snow"
      placeholder="Type Here Buddy ^-^"
      onChange={(message) => setMessage(message)}
    />
  );
};
