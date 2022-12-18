import { useState } from "react";

const TagInput: React.FC<{tags: string[];}> = ({ tags }) => {
  const [tagData, setTagData] = useState(tags);
  const [value, setValue] = useState("");

  const removeTagData = (indexToRemove: number) => {
    setTagData([...tagData.filter((_, index) => index !== indexToRemove)]);
  };

  const addTagData = (event: any): void => {
    if (value !== '') {
      setTagData([...tagData, value]);
      event.target.value = '';
      setValue('');
  }};

  return (
    <div className="flex flex-wrap min-h-[48px] border rounded">
      <ul className="flex flex-wrap p-0 m-2">
        {tagData.map((tag, index) => (
          <li key={ index } className="w-auto h-8 flex items-center justify-center text-black p-2 text-sm list-none border rounded-md m-2 bg-slate-400">
            <span className="mt-1">{ tag }</span>
            <span className="block w-4 h-4 leading-4 text-center text-sm ml-2 bg-slate-400 rounded-[50%] bg-transparent cursor-pointer"
              onClick={() => removeTagData( index )} > x </span>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyUp={(event: React.KeyboardEvent<HTMLInputElement>) => (
          event.key === 'Enter' 
            ? addTagData( event ) 
            : null
          )}
        placeholder="Press enter to add a word"
      />
    </div>
  );
};

export default TagInput;