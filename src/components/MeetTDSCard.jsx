import React from "react"
import {
    IconBrandFacebook,
    IconBrandInstagram,
    IconBrandTwitter,
    IconBrandGithub,
    IconBrandLinkedin,
} from "@tabler/icons-react";

export const MeetTDSCard = ({ photoUrl,name,position,description,instagramUrl,linkedinUrl,facebookUrl,githubUrl,twitterUrl }) => {
    return (
        <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-105 hover:bg-gray-50">
          <div className="overflow-hidden">
            <img
              className="w-full h-56 object-cover object-center transition-transform duration-300 ease-in-out hover:scale-110"
              src={photoUrl}
              alt={`${name}'s profile`}
            />
          </div>
          <div className="px-6 py-4">
            <h3 className="font-bold text-xl mb-2 text-gray-800">{name}</h3>
            <p className="text-gray-600 font-medium text-sm mb-2">{position}</p>
            <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <div className="flex justify-center space-x-4">
                {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-pink-500 transition-colors duration-300"
                >
                    <IconBrandInstagram className="h-6 w-6" />
                </a>
                )}
              {facebookUrl && (
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-500 transition-colors duration-300"
                >
                  <IconBrandFacebook className="h-6 w-6" />
                </a>
              )}
              {twitterUrl && (
                <a
                  href={twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-300"
                >
                  <IconBrandTwitter className="h-6 w-6" />
                </a>
              )}
              {linkedinUrl && (
                <a
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-700 transition-colors duration-300"
                >
                  <IconBrandLinkedin className="h-6 w-6" />
                </a>
              )}
              {githubUrl && (
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-gray-900 transition-colors duration-300"
                >
                  <IconBrandGithub className="h-6 w-6" />
                </a>
              )}
            </div>
          </div>
        </div>
      )
}

