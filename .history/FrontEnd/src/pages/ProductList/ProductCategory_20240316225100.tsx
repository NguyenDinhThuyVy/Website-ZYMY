export default function ProductCategory() {
  return (
    <div className='bg-slate-50 my-2 mx-32 py-7'>
      <div className='container'>
        {productsData && (
          <div className=''>
            <div className=''>
              <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {productsData.data.data.products.map((product) => (
                  <div className='col-span-1' key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              <Pagination
                queryConfig={queryConfig}
                pageSize={productsData.data.data.pagination.page_size}
                namePath='productSearch'
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
