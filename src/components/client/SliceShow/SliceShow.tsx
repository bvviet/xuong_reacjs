import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import "./Slides.css";

const SlideShow = () => {
    return (
        <div className="slide-container">
            <Fade autoplay={true} duration={2000}>
                <div className="each-slide-effect">
                    <div
                        style={{
                            backgroundImage:
                                "url(https://static-images.vnncdn.net/files/publish/2022/10/17/name-168-1336.jpg)",
                        }}
                    >
                        <span>Slide 1</span>
                    </div>
                </div>
                <div className="each-slide-effect">
                    <div
                        style={{
                            backgroundImage:
                                "url(https://nld.mediacdn.vn/zoom/700_438/291774122806476800/2024/3/30/phong-khai-mac-01-1711786136154572491621.png)",
                        }}
                    >
                        <span>Slide 2</span>
                    </div>
                </div>
                <div className="each-slide-effect">
                    <div
                        style={{
                            backgroundImage:
                                "url(https://media.cooky.vn/images/blog-2016/tra-da-via-he-ha-noi%202.jpg)",
                        }}
                    >
                        <span>Slide 3</span>
                    </div>
                </div>
            </Fade>
        </div>
    );
};

export default SlideShow;
