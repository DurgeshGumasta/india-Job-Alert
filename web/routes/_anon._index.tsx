  import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Pencil } from "lucide-react";
import { useState } from "react";
export default function () {
  const [input, setInput] = useState<string>('');
  const [onBtn, setBtn] = useState<boolean>(false);
  function onCLickBtn() {
    setBtn(true)
  };
  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
          👋 Hey, Developer!
        </CardTitle>
        <input type="text" onChange={(event) => {setInput(event.target.value)}} />
      </CardHeader>
      <CardContent>
        {"This is your app's frontend. Start building it in the Gadget editor."}
      </CardContent>
      <CardContent>
        <Button onClick={onCLickBtn}>
          HIii
        </Button>
        {onBtn &&
        <div>
          <h1>{input}</h1>
        </div>
        }
      </CardContent>
    </Card>
  );
}
