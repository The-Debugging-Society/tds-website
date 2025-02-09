import React from "react";
import {
    IconBrandFacebook,
    IconBrandInstagram,
    IconBrandTwitter,
    IconBrandGithub,
    IconBrandLinkedin,
} from "@tabler/icons-react";

export const MeetTDSCard = ({
    photoUrl,
    name,
    position,
    description,
    instagramUrl,
    linkedinUrl,
    facebookUrl,
    githubUrl,
    twitterUrl,
}) => {
    return (
        <div className="max-w-sm rounded-lg p-5 overflow-hidden shadow-lg bg-black text-white border border-gray-700 transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105">
            <div className="overflow-hidden">
                <img
                    className="w-full rounded-lg h-64 object-cover object-center transition-transform duration-300 ease-in-out hover:scale-110"
                    src={photoUrl}
                    alt={`${name}'s profile`}
                />
            </div>
            <div className="px-2 py-4">
                <h3 className="font-bold text-2xl mb-1 text-white">{name}</h3>
                <p className="text-gray-300 font-medium text-md mb-2">{position}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
            </div>
            <div className="px-2 pt-4 pb-2">
                <div className="flex gap-4">
                    {instagramUrl && (
                        <a
                            href={instagramUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-pink-500 transition-colors duration-300"
                        >
                            <IconBrandInstagram className="h-7 w-7" />
                        </a>
                    )}
                    {facebookUrl && (
                        <a
                            href={facebookUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-blue-500 transition-colors duration-300"
                        >
                            <IconBrandFacebook className="h-7 w-7" />
                        </a>
                    )}
                    {twitterUrl && (
                        <a
                            href={twitterUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-blue-400 transition-colors duration-300"
                        >
                            <IconBrandTwitter className="h-7 w-7" />
                        </a>
                    )}
                    {linkedinUrl && (
                        <a
                            href={linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-blue-700 transition-colors duration-300"
                        >
                            <IconBrandLinkedin className="h-7 w-7" />
                        </a>
                    )}
                    {githubUrl && (
                        <a
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-500 hover:text-gray-300 transition-colors duration-300"
                        >
                            <IconBrandGithub className="h-7 w-7" />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};
