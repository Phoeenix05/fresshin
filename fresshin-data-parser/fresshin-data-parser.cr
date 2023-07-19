require "json"

# TODO: Write documentation for `Fresshin::Data::Parser`
module Fresshin::Data::Parser
  VERSION = "0.1.0"

  # TODO: Put your code here

  character_data = File.open("../resources/english-characters.min.json") do |file|
    content = file.gets_to_end
    JSON.parse(content)
  end
  constellation_data = File.open("../resources/english-constellations.min.json") do |file|
    content = file.gets_to_end
    JSON.parse(content)
  end
  talents_data = File.open("../resources/english-talents.min.json") do |file|
    content = file.gets_to_end
    JSON.parse(content)
  end
  puts character_data["data"]["English"]["characters"]["albedo"]
end
