import "./Footer.css";
import iconFooter from "../../../assets/icons/iconFooter.svg";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__list">
                <ul className="footer__item">
                    <h3 className="footer__item-heading">Info</h3>
                    <li>
                        <a href="#">Ha Noi City</a>
                    </li>
                    <li>
                        <a href="#">Submit Trip Feedback</a>
                    </li>
                    <li>
                        <a href="#">Safe Travels Hub</a>
                    </li>
                    <li>
                        <a href="#">Travel Alerts</a>
                    </li>
                    <li>
                        <a href="#">Vaccinations & Testing</a>
                    </li>
                    <li>
                        <a href="#">Flexible Booking</a>
                    </li>
                </ul>
                <ul className="footer__item">
                    <h3 className="footer__item-heading">Booking</h3>
                    <li>
                        <a href="#">My Booking</a>
                    </li>
                    <li>
                        <a href="#">Submit Trip Feedback</a>
                    </li>
                    <li>
                        <a href="#">Safe Travels Hub</a>
                    </li>
                    <li>
                        <a href="#">Travel Alerts</a>
                    </li>
                    <li>
                        <a href="#">Vaccinations & Testing</a>
                    </li>
                    <li>
                        <a href="#">Flexible Booking</a>
                    </li>
                </ul>
                {/* 2 */}
                <ul className="footer__item">
                    <h3 className="footer__item-heading">Company</h3>
                    <li>
                        <a href="#">About us</a>
                    </li>
                    <li>
                        <a href="#">News & Blog</a>
                    </li>
                    <li>
                        <a href="#">Press Center</a>
                    </li>
                    <li>
                        <a href="#">Investors</a>
                    </li>
                    <li>
                        <a href="#">Suppliers</a>
                    </li>
                    <li>
                        <a href="#">Terms & Conditions</a>
                    </li>
                    <li>
                        <a href="#">Privacy Policy</a>
                    </li>
                </ul>
                {/* 3 */}
                <ul className="footer__item">
                    <h3 className="footer__item-heading">Contact</h3>
                    <li>
                        <a href="#">Get In Touch</a>
                    </li>
                    <li>
                        <a href="#">Live Chat</a>
                    </li>
                    <li>
                        <a href="#">FAQ</a>
                    </li>
                    <li>
                        <a href="#">Testimonials</a>
                    </li>
                </ul>
                {/* 4 */}
                <ul className="footer__item">
                    <h3 className="footer__item-heading">Subscribe our newsletter</h3>
                    <li style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        <div className="input__footer">
                            <input type="text" placeholder="Enter your email" />
                        </div>
                        <button className="footer__subscribe">Subscribe</button>
                    </li>
                    <li>
                        <a className="followUs" href="#">
                            Follow us
                        </a>
                    </li>
                    <li>
                        <div className="footer__icon">
                            <img src={iconFooter} alt="" />
                        </div>
                    </li>
                    <li style={{ display: "flex", flexDirection: "column" }}>
                        <label style={{ marginBottom: "10px" }} htmlFor="Global">
                            Change Region
                        </label>
                        <select name="" id="Global">
                            <option className="option" value="">
                                Global
                            </option>
                        </select>
                    </li>
                </ul>
            </div>
            <div className="dots"></div>
            <p className="copyRight">Copyright 2024 DoubleV All Rights Reserved</p>
        </footer>
    );
};
export default Footer;
