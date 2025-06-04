import { Routes, Route } from "react-router-dom";
import { Wrapper } from "./wrapper";
import { Settings } from "../../modules/settings/settings";
import { Profile } from "../../modules/profile/profile";
import { Posts } from "../../modules/posts/posts";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Wrapper />}>
        <Route path="profile" element={<Profile />} />
        <Route path="news" element={<Posts />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
