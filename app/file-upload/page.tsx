import {  } from "@/lib/actions";

export default function page() {
  return (
    <div>
      <h2>File Upload</h2>

      <form action={"sendFile"}>

        <input type="file" accept="image/*" id="image" name="image" multiple />
        <button>send</button>
      </form>


    </div>
  )
}
