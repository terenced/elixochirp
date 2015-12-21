defmodule Elixochirp.PageController do
  use Elixochirp.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
