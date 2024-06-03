function Content() {
    return (
      <section className="container mx-auto my-16 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 border border-[#231f20] rounded">
            <h2 className="text-2xl font-bold text-[#231f20]">Feature One</h2>
            <p className="mt-2 text-[#231f20]">Description of feature one.</p>
          </div>
          <div className="p-6 border border-[#231f20] rounded">
            <h2 className="text-2xl font-bold text-[#231f20]">Feature Two</h2>
            <p className="mt-2 text-[#231f20]">Description of feature two.</p>
          </div>
          <div className="p-6 border border-[#231f20] rounded">
            <h2 className="text-2xl font-bold text-[#231f20]">Feature Three</h2>
            <p className="mt-2 text-[#231f20]">Description of feature three.</p>
          </div>
        </div>
      </section>
    );
  }
export default Content;  