import { useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "./navbar.css";
import { IonIcon } from "@ionic/react";
import {
  menuOutline,
  closeOutline,
  mailOutline,
  personOutline,
  logOutOutline,
  settingsOutline,
} from "ionicons/icons";

interface User {
  displayName: string;
  email: string;
  image: string;
  username: string;
}

interface NavBarProps {
  scrollToSection: (sectionRef: React.RefObject<HTMLDivElement>) => void;
  homeRef: React.RefObject<HTMLDivElement>;
  arrivalRef: React.RefObject<HTMLDivElement>;
  sellBookRef: React.RefObject<HTMLDivElement>;
  aboutUsRef: React.RefObject<HTMLDivElement>;
}

const NavBar: React.FC<NavBarProps> = ({
  scrollToSection,
  homeRef,
  arrivalRef,
  sellBookRef,
  aboutUsRef,
}) => {
  const navBarList = [
    { name: "Home", ref: homeRef },
    { name: "New Arrival", ref: arrivalRef },
    { name: "Sell Your Book", ref: sellBookRef },
    { name: "About Us", ref: aboutUsRef },
  ];

  const location = useLocation(); // Get current location
  const navigate = useNavigate(); // For navigation

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isUserOpen, setIsUserOpen] = useState<boolean>(false);

  const handleMenuClick = (ref: React.RefObject<HTMLDivElement>) => {
    if (location.pathname !== "/") {
      // Navigate to home first, then scroll
      navigate("/");
      setTimeout(() => {
        scrollToSection(ref);
      }, 100); // Short delay to ensure page loads before scrolling
    } else {
      scrollToSection(ref); // Scroll directly if already on the home page
    }
    setIsMenuOpen(false);
  };


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          "https://booksite-b7kfhvha.b4a.run/auth/user",
          {
            method: "GET",
            credentials: "include",
          }
        );
        if (response.ok) {
          const data: User = await response.json();
          setUser(data);
          window.history.pushState({}, "", `/${data.username}`);
        } else {
          // Handle errors
          console.error("Failed to fetch user data:", response.status);
        }
      } catch (error) {
        console.error("Failed to fetch user data", error);
      }
    };

    fetchUser();
  }, []);


  const handleLogout = () => {
    window.location.href = "https://booksite-b7kfhvha.b4a.run/auth/logout";
  };



  return (
    <div className="nav-items">
      <img src="../MagicBook.png" alt="Logo" />
      <div>
        <ul className={`navBar-list ${isMenuOpen ? "open" : ""}`}>
          {navBarList.map((list, index) => (
            <li
              key={index}
              onClick={() => handleMenuClick(list.ref)} // Use updated click handler
            >
              {list.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="menu-container">
        {user ? (
          <div className="user-info">
            <img
              src={user.image}
              alt="User Profile"
              onClick={() => setIsUserOpen(!isUserOpen)}
              className="user-image"
            />
            {isUserOpen && (
              <div className="dropdown-menu">
                <p>
                  <IonIcon icon={personOutline} style={{ padding: "10px" }} />
                  {user.displayName}
                </p>
                <p>
                  <IonIcon icon={mailOutline} style={{ padding: "10px" }} />
                  {user.email}
                </p>
                <button onClick={() => navigate("/cart")}>Cart</button>
                <button>
                  <IonIcon
                    icon={settingsOutline}
                    style={{ "margin-right": "10px" }}
                  />
                  Setting
                </button>
                <button onClick={handleLogout}>
                  <IonIcon
                    icon={logOutOutline}
                    style={{ "padding-left": "10px" }}
                  />
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            className="google"
            onClick={() => {
              window.location.href = "https://booksite-b7kfhvha.b4a.run/auth/google";
            }}
          >
            Google Login
          </button>
        )}
        <button
          className="menu-icon"
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
          }}
        >
          <IonIcon icon={isMenuOpen ? closeOutline : menuOutline} />
        </button>
      </div>
    </div>
  );
};

export default NavBar;
