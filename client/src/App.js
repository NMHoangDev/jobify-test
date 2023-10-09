import GlobalStyles from "./GlobalStyles/GlobalStyles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Error, Landing, Register, ProtectRoute } from "./pages/index";
import {
  AddJobs,
  AllJobs,
  Profile,
  Stats,
  SharedLayout,
} from "./pages/dashboard/index.js";
import Edit from "./component/EditJob/Edit";

function App() {
  return (
    <GlobalStyles>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectRoute>
                <SharedLayout />
              </ProtectRoute>
            }
          >
            <Route index element={<Stats />} />
            <Route path="all-jobs" element={<AllJobs />} />
            <Route path="add-job" element={<AddJobs />} />
            <Route path="profile" element={<Profile />} />
            <Route path="edit" element={<Edit />} />
          </Route>
          <Route path="/landing" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </GlobalStyles>
  );
}

export default App;
