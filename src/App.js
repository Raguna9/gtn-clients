import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { lazy, Suspense} from "react";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import LoadingOverlay from "./utils/loading-handle/LoadingOverlay";

const Users = lazy(() => import("./pages/read/Users"));
const Blogs = lazy(() => import("./pages/read/Blogs"));
const AddUser = lazy(() => import("./pages/create/AddUser"));
const EditUser = lazy(() => import("./pages/update/EditUser"));
const AddBlog = lazy(() => import("./pages/create/AddBlog"));
const EditBlog = lazy(() => import("./pages/update/EditBlog"));
const Partners = lazy(() => import("./pages/read/Partners"));
const AddPartner = lazy(() => import("./pages/create/AddPartner"));
const EditPartner = lazy(() => import("./pages/update/EditPartner"));
const Employees = lazy(() => import("./pages/read/Employees"));
const AddEmployee = lazy(() => import("./pages/create/AddEmployee"));
const EditEmployee = lazy(() => import("./pages/update/EditEmployee"));
const ExternalEmployees = lazy(() => import("./pages/read/ExternalEmployees"));
const AddExternalEmployee = lazy(() => import("./pages/create/AddExternalEmployee"));
const EditExternalEmployee = lazy(() => import("./pages/update/EditExternalEmployee"));
const Gallery = lazy(() => import("./pages/read/Gallerys"));
const AddGallery = lazy(() => import("./pages/create/AddGallery"));
const EditGallery = lazy(() => import("./pages/update/EditGallery"));
const FAQ = lazy(() => import("./pages/read/FAQs"));
const AddFAQ = lazy(() => import("./pages/create/AddFAQ"));
const EditFAQ = lazy(() => import("./pages/update/EditFAQ"));
const Inbox = lazy(() => import("./pages/read/Inboxs"));
const EditMatel = lazy(() => import("./pages/update/EditMatel"));
const AddMatel = lazy(() => import("./pages/create/AddMatel"));
const Matels = lazy(() => import("./pages/read/Matels"));

//client
const Main = lazy(() => import("./pages/website/Main"));
const BlogPages = lazy(() => import("./pages/website/BlogPages"));
const GalleryPages = lazy(() => import("./pages/website/GalleryPages"));
const EmployeePages = lazy(() => import("./pages/website/EmployeePages"));
const FAQPages = lazy(() => import("./pages/website/FAQPages"));
const AboutCompanyPages = lazy(() => import("./pages/website/AboutCompanyPages"));
const SingleBlogPages = lazy(() => import("./pages/website/SingleBlogPages"));
const MatelPages = lazy(() => import("./pages/website/MatelPages"));
const ContactPages = lazy(() => import("./pages/website/ContactPages"));


function App() {
  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={<LoadingOverlay />}>
          <Routes>
            {/* client */}
            <Route path="/" element={<Main />} />
            <Route path="/blogpages" element={<BlogPages />} />
            <Route path="/blogpages/:id" element={<SingleBlogPages />} />
            <Route path="/gallerypages" element={<GalleryPages />} />
            <Route path="/employeepages" element={<EmployeePages />} />
            <Route path="/faqpages" element={<FAQPages />} />
            <Route path="/aboutpages" element={<AboutCompanyPages />} />
            <Route path="/matelpages" element={<MatelPages />} />
            <Route path="/contactpages" element={<ContactPages />} />



            {/* admin */}
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/add" element={<AddUser />} />
            <Route path="/users/edit/:id" element={<EditUser />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/add" element={<AddBlog />} />
            <Route path="/blogs/edit/:id" element={<EditBlog />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/partners/add" element={<AddPartner />} />
            <Route path="/partners/edit/:id" element={<EditPartner />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/employees/add" element={<AddEmployee />} />
            <Route path="/employees/edit/:id" element={<EditEmployee />} />
            <Route path="/externalemployees" element={<ExternalEmployees />} />
            <Route path="/externalemployees/add" element={<AddExternalEmployee />} />
            <Route path="/externalemployees/edit/:id" element={<EditExternalEmployee />} />
            <Route path="/gallerys" element={<Gallery />} />
            <Route path="/gallerys/add" element={<AddGallery />} />
            <Route path="/gallerys/edit/:id" element={<EditGallery />} />
            <Route path="/inboxs" element={<Inbox />} />
            <Route path="/faqs" element={<FAQ />} />
            <Route path="/faqs/add" element={<AddFAQ />} />
            <Route path="/faqs/edit/:id" element={<EditFAQ />} />
            <Route path="/matels/add" element={<AddMatel />} />
            <Route path="/matels" element={<Matels />} />
            <Route path="/matels/edit/:id" element={<EditMatel />} />

          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;