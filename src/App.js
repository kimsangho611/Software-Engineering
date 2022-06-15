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
import MyPageActivityList from "./pages/mypage/activityList";
import EditInfo from "./pages/mypage/editInfo";
import ProductDetail from "./pages/productDetail";
import ViewCategory from "./pages/category/category";
import AdminMain from "./pages/admin";
import ManageUser from "./pages/admin/manageUser";
import ManagePosting from "./pages/admin/managePosting";
import ManageNotice from "./pages/admin/manageNotice";
import ManageInquiry from "./pages/admin/manageInquiry";
import ManageReport from "./pages/admin/manageReport";
import ManageReportDetail from "./pages/admin/manageReportDetail";
import ManageNoticeDetail from "./pages/admin/manageNoticeDetail";
import ManageNoticeEdit from "./pages/admin/manageNoticeEdit";
import ManageNoticeUpload from "./pages/admin/manageNoticeUpload";
import UserNotice from "./pages/notice/userNotice";
import UserNoticeDetail from "./pages/notice/userNoticeDetail";
import ManageInquiryDetail from "./pages/admin/manageInquiryDetail";
import ProductDetailEdit from "./pages/productDetailEdit";
import SellerInfo from "./pages/sellerDetail";

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
          <Route path="/mypage/activityList" element={<MyPageActivityList />} />

          <Route path="/product/register" element={<ProductRegister />} />
          <Route path="/product/detail/:pid" element={<ProductDetail />} />
          <Route
            path="/product/detail/:pid/edit"
            element={<ProductDetailEdit />}
          />
          <Route path="/seller/:uid" element={<SellerInfo />} />

          <Route path="/category/:c1/:c2" element={<ViewCategory />} />
          <Route path="/notice" element={<UserNotice />} />
          <Route path="/notice/:id" element={<UserNoticeDetail />} />

          <Route path="/admin/mypage" element={<AdminMain />} />
          <Route path="/admin/manage/user" element={<ManageUser />} />
          <Route path="/admin/manage/posting" element={<ManagePosting />} />

          <Route path="/admin/manage/notice" element={<ManageNotice />} />
          <Route
            path="/admin/manage/notice/:id"
            element={<ManageNoticeDetail />}
          />
          <Route
            path="/admin/manage/notice/upload"
            element={<ManageNoticeUpload />}
          />
          <Route
            path="/admin/manage/notice/:id/edit"
            element={<ManageNoticeEdit />}
          />

          <Route path="/admin/manage/report" element={<ManageReport />} />
          <Route
            path="/admin/manage/report/:id"
            element={<ManageReportDetail />}
          />

          <Route path="/admin/manage/inquiry" element={<ManageInquiry />} />
          <Route
            path="/admin/manage/inquiry/:id"
            element={<ManageInquiryDetail />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
