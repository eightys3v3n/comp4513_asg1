pushd node_app
./start_dockers.sh
popd

pushd react_app
./start_docker_prod.sh
popd
