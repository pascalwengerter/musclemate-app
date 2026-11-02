{
  inputs.devshell.url = "path:/Users/doesitevenmatter/Projects/devshell";

  outputs = { devshell, ... }: {
    devShells = devshell.devShells;
  };
}
