import pinImg from "../assets/pin.svg";
import Card from "./card";
import Data from "../data/site.json";

export default function Pinned() {
    return (
        <div className="flex flex-col pt-[98px] ">
            <div className="flex gap-2 ml-12 z-1">
                <img src={pinImg} alt="." />
                <p className="text-[24px] text-[#ffffff83] z-1">Pinned Bookmarks</p>
            </div>
            <div className="flex lg:gap-6 lg:justify-center overflow-scroll scrollbar-hide pb-10 pt-10" style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none", msOverflowStyle: "none" }}>
                {Data.map((data, index) => (
                    data.pinned ? (
                        <Card
                            key={index}
                            link={data.site}
                            count={data.clickCount}
                            icon={data.icon}
                        />
                    ) : null
                ))}
            </div>
        </div>
    );
}
