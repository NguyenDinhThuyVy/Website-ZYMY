;<Form.Item label='Ảnh chính' name='image' initialValue={image}>
  <Upload
    action='/admin/products/upload-image'
    listType='picture-card'
    maxCount={1}
    fileList={image ? [{ uid: '-1', name: 'image.png', url: image }] : []}
    onRemove={() => {
      // Set image to null when the remove button is clicked
      form.setFieldsValue({ image: null }) // Cập nhật giá trị trường image thành null
    }}
    onChange={(info) => {
      const { status, response } = info.file
      if (status === 'done' && response && response.url) {
        console.log(response.url)
        form.setFieldsValue({ image: response.url }) // Cập nhật giá trị trường image với đường dẫn của ảnh mới
      }
    }}
  >
    {image ? null : <div>Upload</div>}
  </Upload>
</Form.Item>
