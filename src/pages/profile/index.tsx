import { useState, useEffect } from "react";
import { storage } from '../../services/firebase'
import { listAll, ref, getDownloadURL } from "firebase/storage";

export default function Profile() {
  const [imgURLs, setImgURLs] = useState<string[]>([]);

  useEffect(() => {
    const storageRef = ref(storage, "images/");
    listAll(storageRef)
      .then((res) => {
        const promises = res.items.map((itemRef) => getDownloadURL(itemRef));
        Promise.all(promises)
          .then((downloadURLs) => {
            setImgURLs(downloadURLs);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {imgURLs.map((imgURL) => (
          <img src={imgURL} alt="Imagem" height={200} />
        ))}
      </header>
    </div>
  );
}