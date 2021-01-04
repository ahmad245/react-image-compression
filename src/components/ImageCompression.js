import React, { Component } from 'react';
import compress from 'browser-image-compression';

class ImageCompression extends Component {
    state = {
        compressedLink:
            "http://navparivartan.in/wp-content/uploads/2018/11/placeholder.png",
        originalImage: "",
        originalLink: "",
        outputFileName: "",
        clicked: false,
        uploadImage: false
    }

    handle = (e) => {
        const imageFile = e.target.files[0];
        this.setState({
            originalLink: URL.createObjectURL(imageFile),
            originalImage: imageFile,
            outputFileName: imageFile.name,
            uploadImage: true
        })
    }
    click = (e) => {
        e.preventDefault();

        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 500,
            useWebWorker: true
        };

        if (options.maxSizeMB >= this.state.originalImage.size / 1024) {
            alert("Image is too small, can't be Compressed!");
            return 0;
        }

        let output;
        compress(this.state.originalImage, options).then(x => {
            output = x;

            const downloadLink = URL.createObjectURL(output);
            this.setState({
                compressedLink: downloadLink
            });
            console.log(downloadLink);
        });

        this.setState({ clicked: true });

        return 1;
    };

    render() {
        return (
            <div className="container">
                <div className="text-light text-center">
                    <h1>Three Simple Steps</h1>
                    <h3>1. Upload Image</h3>
                    <h3>2. Click on Compress</h3>
                    <h3>3. Download Compressed Image</h3>
                </div>

                <div className="grid">
                    <div className="left">
                        <div className="col">
                            {this.state.uploadImage ? (
                                <img style={{ height: '200px', width: '200px' }}
                                    className="ht"
                                    variant="top"
                                    src={this.state.originalLink}
                                ></img>
                            ) : (
                                    <img
                                        className="ht"
                                        variant="top"
                                        src="http://navparivartan.in/wp-content/uploads/2018/11/placeholder.png"
                                    ></img>
                                )}
                        </div>
                        <div className="col">
                            <input
                                type="file"
                                accept="image/*"
                                className="mt-2 btn btn-dark w-75"
                                onChange={e => this.handle(e)}
                            />
                        </div>
                    </div>
                    <div className="center">
                        {this.state.outputFileName ? (
                            <button
                                type="button"
                                className=" btn btn-dark"
                                onClick={e => this.click(e)}
                            >
                                Compress
                            </button>
                        ) : (
                                <></>
                            )}
                    </div>

                    <div className="right">
                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 mt-3">
                            <img variant="top" src={this.state.compressedLink}></img>
                            {this.state.clicked ? (
                                <div className="d-flex justify-content-center">
                                    <a
                                        href={this.state.compressedLink}
                                        download={this.state.outputFileName}
                                        className="mt-2 btn btn-dark w-75"
                                    >
                                        Download
                </a>
                                </div>
                            ) : (
                                    <></>
                                )}
                        </div>
                    </div>



                </div>
            </div>
        );
    }
}

export default ImageCompression;