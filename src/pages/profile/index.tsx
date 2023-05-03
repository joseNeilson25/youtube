import { useState, useEffect } from "react";
import { storage } from '../../services/firebase'
import { listAll, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

export default function Profile() {
  const [imgURLs, setImgURLs] = useState<string[]>([]);
  const [videoURLs, setVideoURLs] = useState<string[]>([]);
  const [imgURL, setImgURL] = useState("");
  const [progressPorcent, setPorgessPorcent] = useState(0);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const file = event.target[0]?.files[0];
    if (!file) return;
    
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setPorgessPorcent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          if (file.type.includes('video/')) {
            setVideoURLs((prevUrls) => [...prevUrls, downloadURL]);
          } else {
            setImgURL(downloadURL);
          }
        });
      }
    );
  };
  
  useEffect(() => {
    const storageRef = ref(storage, "images/");
    listAll(storageRef)
      .then((res) => {
        const promises = res.items.map((itemRef) => getDownloadURL(itemRef));
        Promise.all(promises)
          .then((downloadURLs) => {
            const imgUrls = downloadURLs.filter(url => !url.includes('.mp4'));
            const videoUrls = downloadURLs.filter(url => url.includes('.mp4'));
            setImgURLs(imgUrls);
            setVideoURLs(videoUrls);
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
          <img key={imgURL} src={imgURL} alt="Imagem" height={200} />
        ))}
      </header>
      <header className="App-header">
        {videoURLs.map((videoURL) => (
          <video key={videoURL} src={videoURL} height={200} controls />
        ))}
        <form onSubmit={handleSubmit}>
          <input type="file" />
          <button>Enviar</button>
        </form>
        {!imgURL && <p>{progressPorcent}%</p>}
        {imgURL && <img src={imgURL} alt="Imagem" height={200} />}
      </header>
    </div>
  );
}