import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import Login from "./pages/auth/login";
import SignUp from "./pages/auth/signup";
import Drop from "./pages/auth/drop";
import DropSuccess from "./pages/auth/dropSuccess";
import Search from "./pages/search/search";
import ProductRegister from "./pages/productRegister";
import MyPageMain from "./pages/mypage";
import MyPagePoint from "./pages/mypage/point";
import MyPageBuyList from "./pages/mypage/buyList";
import MyPageSellList from "./pages/mypage/sellList";
import MyPageAsk from "./pages/mypage/ask";
import EditInfo from "./pages/mypage/editInfo";
import ProductDetail from "./pages/productDetail";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/drop" element={<Drop />} />
          <Route path="/drop/success" element={<DropSuccess />} />
          <Route path="/search/:word" element={<Search />} />

          <Route path="/mypage" element={<MyPageMain />} />
          <Route path="/mypage/point" element={<MyPagePoint />} />
          <Route path="/mypage/buyList" element={<MyPageBuyList />} />
          <Route path="/mypage/sellList" element={<MyPageSellList />} />
          <Route path="/mypage/ask" element={<MyPageAsk />} />
          <Route path="/mypage/editInfo" element={<EditInfo />} />

          <Route path="/product/register" element={<ProductRegister />} />
          <Route path="/product/detail/:pid" element={<ProductDetail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
