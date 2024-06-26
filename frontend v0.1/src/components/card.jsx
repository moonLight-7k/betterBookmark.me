import linkImage from "../assets/link.svg";
import TextLimited from "./textLimited";


// eslint-disable-next-line react/prop-types
export default function Card({ link, count }) {

    return (
        <a href={link} target="_blank" rel="noreferrer" className="flex flex-col justify-center items-center px-3 rounded-xl border-2 border-solid bg-[#424242] border-[#ffffff12] h-[182px] w-[182px] hover:shadow-xl hover:shadow-[#020202] duration-300 hover:scale-[103%] cursor-pointer hover:border-[#ffffff71] text-[#ffffffaf] hover:text-[#fcfcfcee] z-1">
            <div className="flex flex-col justify-center pb-7">
                <img
                    src={linkImage}
                    alt=""
                    className=" mt-4 lg:ml-32 w-[20px] "
                />
                <div className="flex flex-col justify-center mt-1.5 ">
                    <div className="flex flex-col whitespace-nowrap">
                        {/* To get the log from the link User provide */}
                        <img loading="lazy" src={`https://www.google.com/s2/favicons?domain=${link}&sz=128`} alt="img" className="w-8 rounded-md hover:scale-110 duration-200" />

                        <div className="flex flex-col justify-center mt-1">
                            <p className="mt-1.5 text-lg ">
                                <TextLimited text={extractDomain(link)} maxLength={16} />
                            </p>
                            <p className=" text-[12px] text-[#ffffff] text-opacity-40 overflow-hidden ">
                                <TextLimited text={link} maxLength={22} />
                            </p>
                        </div>
                    </div>
                    <p className="self-center mt-6 text-xs leading-3 text-neutral-500">
                        {`Visited ${count} times`}
                    </p>
                </div>
            </div>
        </a>
    );
}

function extractDomain(url) {
    let domain = url.replace(/(^\w+:|^)\/\//, '');
    domain = domain.split('/')[0];
    domain = domain.split('?')[0];
    if (domain.includes('@')) {
        domain = domain.split('@')[1];
    }
    if (domain.includes('-')) {
        domain = domain.split('-')[0];
    }
    if (domain.includes('www.')) {
        domain = domain.replace('www.' || 'www4', '');
    }

    return domain;
}

