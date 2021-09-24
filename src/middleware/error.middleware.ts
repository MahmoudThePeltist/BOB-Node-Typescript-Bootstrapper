
const errorHandler = (error: any, req: any, res: any, next: any) => {
    res.status(error.code ?? 500).send({
      status: false,
      error: error,
      keys: Object.keys(error),
      message: error.message
    })
}

export default errorHandler;