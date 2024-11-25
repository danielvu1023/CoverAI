
function App() {
  const handleFileChange = (event: any) => {
    const selectedFile: File | undefined = event.target.files[0];
    if (!selectedFile) {
      return;
    }
    const reader = new FileReader();
    reader.onload = async function (e) {
      if (e.target?.result) {
        const arrayBuffer = e.target.result;
        chrome.runtime.sendMessage(
          {
            type: "processFile",
            data: arrayBufferToBase64(arrayBuffer as ArrayBuffer),
          },
          (response) => {
            if (response && response.success) {
              console.log("response", response);
            } else {
              console.error("Error processing file");
            }
          },
        );
      }
    };
    reader.readAsArrayBuffer(selectedFile);
  };
  return (
    <div className="App text-green-500 w-[500px] h-[500px]">
      <input type="file" onChange={handleFileChange} />
    </div>
  );
}

export default App;

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const uint8Array = new Uint8Array(buffer);
  const numberArray: number[] = Array.from(uint8Array);
  const binary = String.fromCharCode.apply(null, numberArray);
  return btoa(binary);
}
