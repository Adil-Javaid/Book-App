import { useRef, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./Components/NavBar";
import Trending from "./Components/Trending";
import Arrival from "./Components/Arrival";
import SellBook from "./Components/SellBook";
import AboutUs from "./Components/AboutUs";
import Payment from './Components/Payment'
import Cart from "./Components/Cart";
import { Book } from "./type"; // Make sure to create and import this type

function App() {
  const homeRef = useRef<HTMLDivElement>(null);
  const arrivalRef = useRef<HTMLDivElement>(null);
  const sellBookRef = useRef<HTMLDivElement>(null);
  const aboutUsRef = useRef<HTMLDivElement>(null);

  const [cartItems, setCartItems] = useState<Book[]>([]);

  const scrollToSection = (sectionRef: React.RefObject<HTMLDivElement>) => {
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

 const addToCart = (book: Book) => {
   setCartItems((prevItems) => {
     const updatedItems = [...prevItems, book];
     alert(`Book added to Cart: ${book.title}`)
     console.log("Updated cart items:", updatedItems); // Log updated cart items
     return updatedItems;
   });
 };

 const removeFromCart =(book: Book) =>{
  setCartItems((prevItems) =>{
    const updatedItems = prevItems.filter(item => item !== book)
    return updatedItems
  })
 }

 useEffect(() => {
   const savedCartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
   if (savedCartItems.length > 0) {
     setCartItems(savedCartItems);
   }
 }, []);

 useEffect(() => {
   localStorage.setItem("cartItems", JSON.stringify(cartItems));
 }, [cartItems]);


  return (
    <Router>
      <NavBar
        scrollToSection={scrollToSection}
        homeRef={homeRef}
        arrivalRef={arrivalRef}
        sellBookRef={sellBookRef}
        aboutUsRef={aboutUsRef}
      />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div ref={homeRef}>
                <Trending />
              </div>
              <div ref={arrivalRef}>
                <Arrival addToCart={addToCart} />
              </div>
              <div ref={sellBookRef}>
                <SellBook />
              </div>
              <div ref={aboutUsRef}>
                <AboutUs />
              </div>
            </>
          }
        />
        <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </Router>
  );
}

export default App;
