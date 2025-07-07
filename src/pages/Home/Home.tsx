import React from "react";
import Header from "@components/Header/Header";

import "./Home.scss";

import screen from "@images/Dashboard_Screen.png";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "routes/routes";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import { changeFormType, toggleForm } from "features/user/userSlice";

type Props = {};

const Home = (props: Props) => {
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector(({ users }) => users);
  const navigate = useNavigate();

  const getStarted = () => {
    if (!currentUser) {
      dispatch(changeFormType("signup"));
      dispatch(toggleForm(true));
    } else navigate(ROUTES.DASHBOARD);
  };

  return (
    <>
      <Header />
      <div className="container">
        <div className="home">
          <div className="home__text">
            <h1 className="home__text-title">
              Все ваши подписки в одном месте.
            </h1>
            <h2 className="home__text-subtitle">
              Будьте в курсе событий, никогда не теряйте подписки
            </h2>
          </div>

          <button className="home__button" onClick={getStarted}>
            Давайте начнем
          </button>

          <div className="home__image">
            <img src={screen} alt="Dashboard Screen" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
