import { Link } from "react-router-dom";

interface RelatedLink {
  title: string;
  description: string;
  path: string;
  icon: JSX.Element;
}

interface RelatedLinksProps {
  links: RelatedLink[];
}

export default function RelatedLinks({ links }: RelatedLinksProps) {
  return (
    <div className="mt-12 bg-white rounded-xl shadow-lg border border-gray-100 p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Related Information
      </h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {links.map((link, index) => (
          <Link
            key={index}
            to={link.path}
            className="group block p-6 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors duration-200"
          >
            <div className="flex items-center mb-3">
              <div className="text-blue-500 group-hover:text-blue-600 transition-colors duration-200">
                {link.icon}
              </div>
              <h3 className="ml-3 text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                {link.title}
              </h3>
            </div>
            <p className="text-gray-600 group-hover:text-gray-700">
              {link.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
