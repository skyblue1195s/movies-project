import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import { Main } from "@layouts/index";
import { main } from "@routes/index";

const App = () => {
  return (
    <Routes>
      <Route element={<Main />}>
        {main.map((item: any, key: any) => (
          <Route key={key} path={item.path} element={item.component} />
        ))}
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
