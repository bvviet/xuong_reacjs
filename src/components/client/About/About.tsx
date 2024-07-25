import "./About.css";
import orange from "../../../assets/images/orange.png";
import lemon from "../../../assets/images/lemon.png";
import tea from "../../../assets/images/tea.png";
import coffee from "../../../assets/images/cafee.png";
import thuocLa from "../../../assets/images/thuocla.png";
import dep from "../../../assets/images/dep.png";
import cr7 from "../../../assets/images/cr7.png";
import cr74 from "../../../assets/images/cr74.png";
// import cr7_3 from "../../../assets/images/cr7_3.png";
import thiagoSilval from "../../../assets/images/thiagoSilval.png";
import thiago2 from "../../../assets/images/thiago2.png";

const About = () => {
    return (
        <div className="about">
            <div className="about__top">
                <div className="about__header">
                    <img src={orange} className="orange" alt="" />
                    <img src={lemon} className="lemon" alt="" />
                    <div className="about__header-main">
                        <div className="about__header-item">
                            <p className="about__header-heading">350+</p>
                            <p className="about__header-desc">Order per minute</p>
                        </div>
                        <div className="about__header-item">
                            <p className="about__header-heading">10x</p>
                            <p className="about__header-desc">Faster delivery</p>
                        </div>
                        <div className="about__header-item">
                            <p className="about__header-heading">10+</p>
                            <p className="about__header-desc">In Country</p>
                        </div>
                        <div className="about__header-item">
                            <p className="about__header-heading">99.9%</p>
                            <p className="about__header-desc">Order accuracy</p>
                        </div>
                    </div>
                </div>
            </div>

            <img src={cr7} alt="" />
            <img src={thiagoSilval} alt="" />
            <img src={cr74} alt="" />
            <img src={thiago2} width={"370px"} style={{marginLeft:"45px"}} alt="" />

            <div className="about__main">
                <div className="about__left">
                    <div className="bg1"></div>
                    <div className="bg2"></div>
                    <p className="tea">Trà đá</p>
                    <p className="coffee">Cà phê</p>
                    <img src={tea} className="tea2" />
                    <img src={coffee} className="coffee2" />
                    <img src={thuocLa} className="thuocLa" />
                    <img src={dep} className="dep" />
                </div>
                <div className="about__right">
                    <h1>"Trà Đá, Thuốc Lào: Nỗi Khổ Của Cô Đơn"</h1>
                    <p style={{ whiteSpace: "pre-wrap", lineHeight: "1.5" }}>
                        Trà đá mát, thuốc lào thơm,
                        <br />
                        Chén trà xanh, khói thuốc bồng bềnh.
                        <br />
                        Làm bạn vui, buổi chiều hè,
                        <br />
                        Hương vị quê, giản dị yêu thương.
                        <br />
                        <br />
                        Quán cóc nhỏ, quán bia hơi,
                        <br />
                        Thoảng đâu đó tiếng cười rộn rã.
                        <br />
                        Ngồi cùng bạn, chuyện phiếm vui,
                        <br />
                        Khói thuốc bốc, hương trà quyện lại.
                        <br />
                    </p>

                    <a
                        href="https://thecoffeehouse.com/blogs/teaholic/van-hoa-uong-tra-cua-nguoi-viet-xua-va-nay"
                        className="learn__more"
                    >
                        Xem thêm
                    </a>
                </div>
            </div>
        </div>
    );
};
export default About;
