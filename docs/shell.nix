# shell.nix
#
# This file is used by the [Nix package manager](https://nixos.org/nix/) to
# create a reproducible project environment across different computers.
#
# The main purpose of this file is to provide Ruby to allow contributing to the
# library documentation. It is not required to use Nix, you're free to bring
# your own Ruby.
#
# With Nix installed, you can run
#
#     nix-shell
#
# to enter a shell environment with the required tools available. Once there, run
#
#     npm run docs   (to update the documentation)
#     jekyll serve   (to start the documentation server)
#
# Nix can help manage Ruby dependencies more deterministically. The Ruby Gems for
# Nix are loaded from "gemset.nix", which is based on Ruby’s "Gemfile.lock". To
# add or remove Gems, do the following:
#
#   1. Edit "Gemfile" to add/remove a gem
#   2. Update "Gemfile.lock" with `nix-shell -p bundler --run "bundle package --no-install --path vendor"`
#   3. Derive the "gemset.nix" expression by running `nix-shell -p bundix --run bundix`

let
  pkgs = import (fetchTarball http://nixos.org/channels/nixpkgs-18.09-darwin/nixexprs.tar.xz) {};
  ruby = pkgs.ruby;

in pkgs.stdenv.mkDerivation rec {
  name = "fp-ts";

  gems = pkgs.bundlerEnv {
    inherit name ruby;
    gemfile = ./Gemfile;
    lockfile = ./Gemfile.lock;
    gemset = ./gemset.nix;
  };

  buildInputs = [
    ruby
    gems
    pkgs.jekyll
    pkgs.nodejs
  ];
}
