import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
    const { pathname } = useLocation();

    const excludedRoutes = ["/events/upcoming","/events/past","/events/past-workshop"]

    useEffect(() => {
        if (!excludedRoutes.includes(pathname)){
            window.scrollTo(0,0);
        }
    }, [pathname]);

    return null;
};

export default ScrollToTop;
