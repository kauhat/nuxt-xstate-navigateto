{ pkgs ? import <nixpkgs> { } }:

pkgs.mkShell {
  buildInputs = [
    # JS lang and dev tools
    pkgs.nodejs-18_x
    pkgs.yarn

    # keep this line if you use bash
    pkgs.bashInteractive
  ];
}
