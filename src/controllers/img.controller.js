exports.singleFileUpload = (req, res) => {
  if (!req.file) {
    console.log("No img upload");
    res.json({ err: 'Debe Seleccionar una imagen' })
  } else {
    console.log(req.file.filename)
    // var imgsrc = 'http://localhost:9000/tyt/finan/img/' + req.file.filename
    let url = req.file.filename
    res.json({ msg: 'Image Upload', url: url })
  }
}

exports.multipleFileUpload = (req, res) => {
  console.log('se cargaron las imágenes:')
  req.files.forEach(element => {
    console.log(element.originalname)
    console.log(element.path)
    console.log(element.mimetype)
  });
  console.log('--------------------')
}