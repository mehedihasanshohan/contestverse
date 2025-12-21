import React from "react";

function Badge({ children }) {
  return (
    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-800">
      {children}
    </span>
  );
}

const ResourcesPage = () => {
  const resources = [
    {
      title: "How to run a successful design contest",
      type: "Article",
      length: "6 min read",
      tags: ["Design", "Best Practices"],
    },
    {
      title: "ContestHub Starter Kit (templates)",
      type: "Template Pack",
      length: "Download",
      tags: ["Templates", "Assets"],
    },
    {
      title: "Video: Judging entries like a pro",
      type: "Video",
      length: "12 min",
      tags: ["Judging", "Video"],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto bg-slate-100 p-6">
      <header className="mb-6">
        <div className="text-sm text-gray-500">Resources</div>
        <h1 className="text-3xl font-extrabold">Improve your contests with curated resources</h1>
        <p className="text-gray-600 mt-2">
          Guides, templates, and videos to help creators and participants succeed.
        </p>
      </header>

      <div className="flex gap-6 flex-col md:flex-row">
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white dark:bg-gray-800 p-4 rounded-lg border">
          <h4 className="font-semibold mb-3">Filter</h4>
          <div className="space-y-2 text-sm">
            <label className="block"><input type="checkbox" className="mr-2" /> Articles</label>
            <label className="block"><input type="checkbox" className="mr-2" /> Videos</label>
            <label className="block"><input type="checkbox" className="mr-2" /> Templates</label>
          </div>
          <div className="mt-4">
            <button className="px-3 py-2 rounded bg-blue-600 text-white text-sm">Apply</button>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1">
          <div className="space-y-4">
            {resources.map((r, i) => (
              <article key={i} className="p-4 rounded-lg border hover:shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{r.title}</h3>
                    <div className="text-sm text-gray-500 mt-1">
                      {r.type} • {r.length}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex gap-2 justify-end">
                      {r.tags.map((t) => (
                        <Badge key={t}>{t}</Badge>
                      ))}
                    </div>
                    <div className="mt-2">
                      <button className="px-3 py-2 rounded border text-sm">Open</button>
                      <button className="px-3 py-2 rounded ml-2 bg-gray-100 text-sm">Save</button>
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-sm text-gray-600">
                  A short summary goes here — explain what the resource is and how it helps creators.
                </p>
              </article>
            ))}
          </div>
        </main>
      </div>

      <footer className="mt-8 text-center text-sm text-gray-500">
        Can’t find something? <a className="underline">Request a resource</a>
      </footer>
    </div>
  );
};

export default ResourcesPage;
