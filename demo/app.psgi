use v5.14;
use Plack::App::WebSocket;
use Plack::Builder;
use Plack::App::Directory;

builder {
    mount '/urls' => Plack::App::WebSocket->new(
        on_establish => sub {
            my ($conn, $env) = @_;
            my @urls = (map { "http://example.$_/" } qw(org net com edu));
            while(1) {
                $conn->send("url: " . $urls[rand @urls]);
                sleep(2);
            }
        });
    mount '/numbers' => Plack::App::WebSocket->new(
        on_establish => sub {
            my ($conn, $env) = @_;
            while(1) {
                $conn->send("number: " . rand 1000);
                sleep(1);
            }
        });
    mount '/' => Plack::App::Directory->new( root => '.' )->to_app;
}
