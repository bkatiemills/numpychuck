import tornado.ioloop
import tornado.web


class GetArchives(tornado.web.RequestHandler):
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")

    def get(self):
        path = 'numpydump.npy'
        try:
            f = open(path, 'rb')

            with open(path, 'rb') as f:
                while 1:
                    data = f.read(16384) # or some other nice-sized chunk
                    if not data: break
                    self.write(data)
            self.finish()


        except IOError:
            raise tornado.web.HTTPError(404, 'Invalid archive')

application = tornado.web.Application([
    (r"/", GetArchives),
])

if __name__ == "__main__":
    application.listen(8888)
    tornado.ioloop.IOLoop.instance().start()
